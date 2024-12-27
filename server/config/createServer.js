import express from 'express';
import { setupMiddleware } from '../middleware/index.js';
import { setupRoutes } from '../routes/index.js';
import { errorHandler } from '../middleware/errorHandler.js';

export function createServer() {
  const app = express();
  
  setupMiddleware(app);
  setupRoutes(app);
  app.use(errorHandler);
  
  return app;
}