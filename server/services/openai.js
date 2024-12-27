import OpenAI from 'openai';
import { config } from '../config/environment.js';

export async function generatePoem(description) {
  if (!config.openai.apiKey) {
    throw new Error('OpenAI API key is not configured');
  }

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

    if (!response.choices?.[0]?.message?.content) {
      throw new Error('No poem generated');
    }

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error(`Failed to generate poem: ${error.message}`);
  }
}