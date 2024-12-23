import OpenAI from 'openai';
import { config } from '../config/environment.js';

export async function generatePoem(description) {
  const openai = new OpenAI({
    apiKey: config.openai.apiKey
  });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "You are a poet who writes in the style of E. E. Cummings. Create a poem based on the given description."
      }, {
        role: "user",
        content: `Write a poem in E. E. Cummings style about: ${description}`
      }],
      max_tokens: 200
    });

    return response.choices[0].message.content;
  } catch (error) {
    throw new Error('Failed to generate poem: ' + error.message);
  }
}