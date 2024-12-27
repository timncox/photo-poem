import express from 'express';
import rateLimit from 'express-rate-limit';
import { corsMiddleware } from './cors.js';
import { securityHeaders } from './security.js';
import { SERVER_CONFIG } from '../config/constants.js';

export function setupMiddleware(app) {
  // Security headers first
  app.use(securityHeaders);
  
  // Rate limiting
  app.use(rateLimit({
    windowMs: SERVER_CONFIG.RATE_LIMIT.WINDOW_MS,
    max: SERVER_CONFIG.RATE_LIMIT.MAX_REQUESTS
  }));
  
  // CORS and body parsing
  app.use(corsMiddleware);
  app.use(express.json({ 
    limit: SERVER_CONFIG.MAX_REQUEST_SIZE,
    verify: (req, res, buf) => {
      try {
        JSON.parse(buf);
      } catch (e) {
        res.status(400).json({ error: 'Invalid JSON payload' });
        throw new Error('Invalid JSON');
      }
    }
  }));
  
  // Trust proxy for rate limiting
  app.set('trust proxy', 1);
}