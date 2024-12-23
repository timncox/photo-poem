import cors from 'cors';
import { SERVER_CONFIG } from '../config/constants.js';

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin || SERVER_CONFIG.ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  maxAge: SERVER_CONFIG.CORS_MAX_AGE
});