import dotenv from 'dotenv';
import { SERVER_CONFIG } from './constants.js';

dotenv.config();

const getEnvVar = (key, defaultValue = '') => process.env[key] || defaultValue;

export const config = {
  port: parseInt(getEnvVar('PORT', String(SERVER_CONFIG.DEFAULT_PORT))),
  env: getEnvVar('NODE_ENV', 'development'),
  cors: {
    origin: SERVER_CONFIG.ALLOWED_ORIGINS
  },
  google: {
    apiKey: getEnvVar('GOOGLE_CLOUD_API_KEY')
  },
  openai: {
    apiKey: getEnvVar('OPENAI_API_KEY')
  }
};