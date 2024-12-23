import { ImageAnnotatorClient } from '@google-cloud/vision';
import { config } from '../../config/environment.js';

const visionClient = new ImageAnnotatorClient({
  apiKey: config.google.apiKey
});

const features = [
  { type: 'LABEL_DETECTION' },
  { type: 'OBJECT_LOCALIZATION' },
  { type: 'IMAGE_PROPERTIES' },
  { type: 'SAFE_SEARCH_DETECTION' },
];

export async function analyzeImage(imageData) {
  try {
    // Remove data URL prefix if present
    const image = imageData.replace(/^data:image\/\w+;base64,/, '');
    
    // Request multiple features in a single API call
    const [result] = await visionClient.annotateImage({
      image: { content: image },
      features
    });

    if (!result || result.error) {
      throw new Error(result?.error?.message || 'Failed to analyze image');
    }

    // Extract relevant information
    const {
      labelAnnotations = [],
      localizedObjectAnnotations = [],
      imagePropertiesAnnotation,
      safeSearchAnnotation,
    } = result;

    // Combine all detected elements into a rich description
    const elements = [
      ...labelAnnotations.slice(0, 5).map(label => label.description),
      ...localizedObjectAnnotations.slice(0, 3).map(obj => obj.name)
    ];

    // Get dominant colors
    const colors = imagePropertiesAnnotation?.dominantColors?.colors
      ?.slice(0, 3)
      .map(color => ({
        red: color.color.red,
        green: color.color.green,
        blue: color.color.blue
      })) || [];

    return {
      description: elements.join(', '),
      colors,
      safeSearch: safeSearchAnnotation
    };
  } catch (error) {
    console.error('Vision API Error:', error);
    throw new Error('Failed to analyze image with Vision API');
  }
}