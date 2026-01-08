// API Client for Noah Kellner Backend

const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8000';

export interface ChatAction {
  action: 'navigate' | 'open_contact';
  target?: string;
  type?: string;
}

export interface ChatResponse {
  response: string;
  actions: ChatAction[];
  session_id: string | null;
}

export async function sendMessage(
  message: string,
  sessionId?: string | null
): Promise<ChatResponse> {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      session_id: sessionId,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
