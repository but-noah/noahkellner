import json
import re
from pathlib import Path

import anthropic

from app.config import get_settings
from app.models.chat import ChatAction, ChatResponse


class ClaudeService:
    """Service for interacting with Claude API."""

    def __init__(self):
        settings = get_settings()
        self.client = anthropic.Anthropic(api_key=settings.anthropic_api_key)
        self.model = settings.claude_model
        self.max_tokens = settings.claude_max_tokens
        self.system_prompt = self._load_system_prompt()

    def _load_system_prompt(self) -> str:
        """Load the system prompt from the markdown file."""
        prompt_path = Path(__file__).parent.parent / "prompts" / "noah_persona.md"
        return prompt_path.read_text(encoding="utf-8")

    def _extract_actions(self, response_text: str) -> tuple[str, list[ChatAction]]:
        """Extract JSON actions from response text."""
        actions = []
        clean_response = response_text

        # Pattern 1: JSON in markdown code blocks
        json_block_pattern = r'```json\s*(\{[^`]+\})\s*```'
        matches = re.findall(json_block_pattern, response_text)
        for match in matches:
            try:
                action_data = json.loads(match)
                if "action" in action_data:
                    actions.append(ChatAction(**action_data))
            except (json.JSONDecodeError, ValueError):
                continue
        clean_response = re.sub(json_block_pattern, '', clean_response)

        # Pattern 2: Plain JSON objects on their own line (action objects)
        # Matches {"action": "...", ...} patterns
        plain_json_pattern = r'\n?\s*\{"action"\s*:\s*"[^"]+"\s*(?:,\s*"[^"]+"\s*:\s*"[^"]*"\s*)*\}'
        plain_matches = re.findall(plain_json_pattern, clean_response)
        for match in plain_matches:
            try:
                action_data = json.loads(match.strip())
                if "action" in action_data:
                    actions.append(ChatAction(**action_data))
            except (json.JSONDecodeError, ValueError):
                continue
        clean_response = re.sub(plain_json_pattern, '', clean_response)

        return clean_response.strip(), actions

    async def chat(self, message: str, session_id: str | None = None) -> ChatResponse:
        """Send a message to Claude and get a response."""
        response = self.client.messages.create(
            model=self.model,
            max_tokens=self.max_tokens,
            system=self.system_prompt,
            messages=[{"role": "user", "content": message}],
        )

        response_text = response.content[0].text
        clean_response, actions = self._extract_actions(response_text)

        return ChatResponse(
            response=clean_response,
            actions=actions,
            session_id=session_id,
        )


# Singleton instance
_claude_service: ClaudeService | None = None


def get_claude_service() -> ClaudeService:
    """Get or create Claude service instance."""
    global _claude_service
    if _claude_service is None:
        _claude_service = ClaudeService()
    return _claude_service
