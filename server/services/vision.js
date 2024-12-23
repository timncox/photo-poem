import vision from '@google-cloud/vision';
import { config } from '../config/environment.js';

export async function analyzeImage(imageData) {
  const client = new vision.ImageAnnotatorClient({
    apiKey: config.google.apiKey
  });

  const image = imageData.replace(/^data:image\/\w+;base64,/, '');
  
  try {
    const [result] = await client.labelDetection({
      image: { content: image }
    });
    
    const labels = result.labelAnnotations;
    return labels.map(label => label.description).join(', ');
  } catch (error) {
    throw new Error('Failed to analyze image: ' + error.message);
  }
}