import type { StructuredAiResponse, ChatMessage } from '../server/healthAiServerHandler.ts';
import { processHealthAiRequest } from '../server/healthAiServerHandler.ts';

export type { StructuredAiResponse, ChatMessage };

/**
 * Send real user conversation history to the server-side PHARMA AI endpoint (/api/health-ai)
 */
export async function sendHealthAiQuery(
  messages: ChatMessage[],
  userLocationCity: string = 'Nador',
  countryCode: string = 'MA'
): Promise<StructuredAiResponse> {
  const payload = {
    messages,
    userLocationCity,
    countryCode
  };

  try {
    const response = await fetch('/api/health-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data: StructuredAiResponse = await response.json();
      return data;
    }
  } catch (error) {
    console.warn('Network request to /api/health-ai failed, using direct handler:', error);
  }

  // Client-side fallback if server route is unavailable
  return await processHealthAiRequest(payload);
}
