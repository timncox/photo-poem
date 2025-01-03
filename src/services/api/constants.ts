export const API_CONSTANTS = {
  BASE_URL: 'https://photo-poetry-api.onrender.com',
  ENDPOINTS: {
    ANALYZE: '/api/analyze',
    HEALTH: '/health',
    TTS: '/api/tts'
  },
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  TIMEOUT: 30000,
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000,
    BACKOFF_FACTOR: 1.5
  }
} as const;