import express from 'express';
import { corsMiddleware } from './cors.js';
import { securityHeaders } from './security.js';

export function setupMiddleware(app) {
  app.use(securityHeaders);
  app.use(corsMiddleware);
  app.use(express.json({ 
    limit: '50mb',
    verify: (req, res, buf) => {
      try {
        JSON.parse(buf);
      } catch (e) {
        res.status(400).json({ error: 'Invalid JSON payload' });
        throw new Error('Invalid JSON');
      }
    }
  }));
}