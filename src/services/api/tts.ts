import { apiRequest } from './client';
import { API_CONSTANTS } from './constants';

export async function generateAudio(text: string): Promise<Blob> {
  const response = await fetch(`${API_CONSTANTS.BASE_URL}${API_CONSTANTS.ENDPOINTS.TTS}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text })
  });

  if (!response.ok) {
    throw new Error('Failed to generate audio');
  }

  return response.blob();
}