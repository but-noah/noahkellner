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

        # Find JSON blocks in the response
        json_pattern = r'```json\s*(\{[^`]+\})\s*```'
        matches = re.findall(json_pattern, response_text)

        for match in matches:
            try:
                action_data = json.loads(match)
                actions.append(ChatAction(**action_data))
            except (json.JSONDecodeError, ValueError):
                continue

        # Remove JSON blocks from the response text
        clean_response = re.sub(json_pattern, '', response_text).strip()

        return clean_response, actions

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
