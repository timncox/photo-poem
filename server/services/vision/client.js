import vision from '@google-cloud/vision';
import { config } from '../../config/environment.js';

export const visionClient = new vision.ImageAnnotatorClient({
  apiKey: config.google.apiKey
});