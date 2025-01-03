import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { config } from '../../config/environment.js';

export async function synthesizeSpeech(text) {
  if (!config.google.apiKey) {
    throw new Error('Google Cloud API key is not configured');
  }

  const client = new TextToSpeechClient({
    apiKey: config.google.apiKey
  });

  try {
    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: { languageCode: 'en-US', name: 'en-US-Neural2-D' },
      audioConfig: { audioEncoding: 'MP3' },
    });

    return response.audioContent;
  } catch (error) {
    console.error('Text-to-Speech API Error:', error);
    throw new Error('Failed to generate audio');
  }
}