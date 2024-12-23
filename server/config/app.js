import express from 'express';
import { setupMiddleware } from '../middleware/index.js';
import { setupRoutes } from '../routes/index.js';
import { errorHandler } from '../middleware/errorHandler.js';
import { requestLogger } from '../middleware/logging.js';
import healthRouter from '../routes/health.js';

export function createApp() {
  const app = express();
  
  // Add request logging first
  app.use(requestLogger);
  
  // Setup middleware
  setupMiddleware(app);
  
  // Root and health routes should be before API routes
  app.use('/', healthRouter);
  
  // Setup other routes
  setupRoutes(app);
  
  // Error handler must be last
  app.use(errorHandler);
  
  return app;
}