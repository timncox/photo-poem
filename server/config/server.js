import express from 'express';
import cors from 'cors';
import { corsOptions } from './cors.js';
import { errorHandler } from '../middleware/errorHandler.js';
import { securityHeaders } from '../middleware/security.js';
import analyzeRouter from '../routes/analyze.js';
import healthRouter from '../routes/health.js';

export function createServer() {
  const app = express();
  
  // Core middleware
  app.use(securityHeaders);
  app.use(cors(corsOptions));
  app.use(express.json({ limit: '50mb' }));
  
  // Routes
  app.use('/api/analyze', analyzeRouter);
  app.use('/health', healthRouter);
  
  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
  
  // Error handling must be last
  app.use(errorHandler);
  
  return app;
}