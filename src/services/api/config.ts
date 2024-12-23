import { API_CONSTANTS } from './constants';

export const API_CONFIG = {
  baseUrl: API_CONSTANTS.BASE_URL,
  endpoints: API_CONSTANTS.ENDPOINTS,
  headers: API_CONSTANTS.HEADERS,
  timeout: API_CONSTANTS.TIMEOUT
} as const;