import { isProduction } from '../../utils/environment';

const API_BASE_URL = isProduction()
  ? 'https://photo-poetry-api.onrender.com'
  : 'http://localhost:3000';

export const API_CONSTANTS = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    ANALYZE: '/api/analyze',
    HEALTH: '/health'
  },
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  TIMEOUT: 30000,
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000
  }
} as const;