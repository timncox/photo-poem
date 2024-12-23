export const SERVER_CONFIG = Object.freeze({
  DEFAULT_PORT: 3000,
  ALLOWED_ORIGINS: Object.freeze([
    'http://localhost:5173',
    'http://127.0.0.1:5173', 
    'http://[::1]:5173',
    'https://photo-poetry-app.netlify.app',
    'https://www.photo-poetry-app.netlify.app'
  ]),
  MAX_REQUEST_SIZE: '50mb',
  CORS_MAX_AGE: 86400,
  HEALTH_CHECK_INTERVAL: 10000,
  API_PREFIX: '/api'
});