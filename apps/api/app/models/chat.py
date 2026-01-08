from pydantic import BaseModel
from typing import Optional


class ChatRequest(BaseModel):
    """Request model for chat endpoint."""

    message: str
    session_id: Optional[str] = None


class ChatAction(BaseModel):
    """Action that the chatbot suggests."""

    action: str  # "navigate" or "open_contact"
    target: Optional[str] = None  # URL path for navigate
    type: Optional[str] = None  # Contact type: job, project, investment, etc.


class ChatResponse(BaseModel):
    """Response model for chat endpoint."""

    response: str
    actions: list[ChatAction] = []
    session_id: Optional[str] = None
