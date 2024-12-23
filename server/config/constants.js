export const SERVER_CONFIG = Object.freeze({
  DEFAULT_PORT: process.env.PORT || 10000, // Changed to match Render's expected port
  DEFAULT_HOST: '0.0.0.0',
  ALLOWED_ORIGINS: Object.freeze([
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://photo-poetry-app.netlify.app',
    /^https:\/\/[a-z0-9-]+\.preview\.stackblitz\.io$/,
    /^https:\/\/[a-z0-9-]+\.stackblitz\.io$/
  ]),
  MAX_REQUEST_SIZE: '50mb',
  CORS_MAX_AGE: 86400,
  API_PREFIX: '/api'
});