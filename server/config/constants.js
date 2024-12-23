export const SERVER_CONFIG = Object.freeze({
  DEFAULT_PORT: process.env.PORT || 3000,
  DEFAULT_HOST: '0.0.0.0', // Always bind to all interfaces
  ALLOWED_ORIGINS: Object.freeze([
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://[::1]:5173',
    'https://photo-poetry-app.netlify.app',
    // Allow Stackblitz preview domains
    /^https:\/\/[a-z0-9-]+-[a-z0-9]+\.preview\.app\.github\.dev$/,
    /^https:\/\/[a-z0-9-]+\.stackblitz\.io$/
  ]),
  MAX_REQUEST_SIZE: '50mb',
  CORS_MAX_AGE: 86400,
  HEALTH_CHECK_INTERVAL: 10000,
  API_PREFIX: '/api'
});