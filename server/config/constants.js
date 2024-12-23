export const SERVER_CONFIG = {
  DEFAULT_PORT: 3000,
  ALLOWED_ORIGINS: [
    'http://localhost:5173',
    'http://127.0.0.1:5173', 
    'http://[::1]:5173',
    'http://192.168.1.104:5173'
  ],
  MAX_REQUEST_SIZE: '50mb',
  CORS_MAX_AGE: 86400,
  HEALTH_CHECK_INTERVAL: 10000
};