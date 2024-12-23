import { API_CONSTANTS } from './constants';

export const logApiRequest = (endpoint: string, options: RequestInit) => {
  console.debug(
    `[API] Request to ${endpoint}:`,
    {
      url: `${API_CONSTANTS.BASE_URL}${endpoint}`,
      method: options.method || 'GET',
      timestamp: new Date().toISOString()
    }
  );
};

export const logApiResponse = (endpoint: string, status: number, duration: number) => {
  console.debug(
    `[API] Response from ${endpoint}:`,
    {
      status,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString()
    }
  );
};

export const logApiError = (endpoint: string, error: Error) => {
  console.error(
    `[API] Error for ${endpoint}:`,
    {
      message: error.message,
      name: error.name,
      timestamp: new Date().toISOString()
    }
  );
};