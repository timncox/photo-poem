import { startServer } from './config/server.js';
import { SERVER_CONFIG } from './config/constants.js';

startServer(SERVER_CONFIG.DEFAULT_PORT, SERVER_CONFIG.DEFAULT_HOST);