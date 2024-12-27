export const SERVER_CONFIG = Object.freeze({
  DEFAULT_PORT: process.env.PORT || 10000,
  DEFAULT_HOST: '0.0.0.0',
  ALLOWED_ORIGINS: Object.freeze([
    'https://photo-poetry-app.netlify.app',
    /^https:\/\/[a-z0-9-]+\.netlify\.app$/
  ]),
  MAX_REQUEST_SIZE: '50mb',
  CORS_MAX_AGE: 86400,
  API_PREFIX: '/api',
  RATE_LIMIT: Object.freeze({
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100 // per window per IP
  })
});