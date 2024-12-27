import dotenv from 'dotenv';
import { SERVER_CONFIG } from './constants.js';

dotenv.config();

const getEnvVar = (key, defaultValue = '') => process.env[key] || defaultValue;

export const config = {
  port: parseInt(getEnvVar('PORT', '10000')), // Default to Render's expected port
  env: getEnvVar('NODE_ENV', 'development'),
  cors: {
    origin: getEnvVar('CORS_ORIGINS', 'https://photo-poetry-app.netlify.app').split(',')
  },
  google: {
    apiKey: getEnvVar('GOOGLE_CLOUD_API_KEY')
  },
  openai: {
    apiKey: getEnvVar('OPENAI_API_KEY')
  }
};