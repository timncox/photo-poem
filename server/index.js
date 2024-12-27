import { createApp } from './config/app.js';
import { SERVER_CONFIG } from './config/constants.js';

const app = createApp();

const server = app.listen(SERVER_CONFIG.DEFAULT_PORT, SERVER_CONFIG.DEFAULT_HOST, () => {
  console.log(`Server running on ${SERVER_CONFIG.DEFAULT_HOST}:${SERVER_CONFIG.DEFAULT_PORT}`);
});

// Graceful shutdown
const shutdown = () => {
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);