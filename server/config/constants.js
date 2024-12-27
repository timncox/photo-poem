export const SERVER_CONFIG = {
  DEFAULT_PORT: process.env.PORT || 10000,
  DEFAULT_HOST: '0.0.0.0',
  ALLOWED_ORIGINS: [
    'https://photo-poetry-app.netlify.app',
    /^https:\/\/[a-z0-9-]+\.netlify\.app$/
  ],
  MAX_REQUEST_SIZE: '50mb',
  CORS_MAX_AGE: 86400,
  API_PREFIX: '/api'
};