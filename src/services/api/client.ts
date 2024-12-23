import { API_CONFIG } from './config';
import { fetchWithRetry } from './retry';
import { logApiRequest, logApiResponse, logApiError } from './logging';

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);
  const startTime = Date.now();

  try {
    logApiRequest(endpoint, options);
    
    const response = await fetchWithRetry<T>(
      `${API_CONFIG.baseUrl}${endpoint}`,
      {
        ...options,
        headers: {
          ...API_CONFIG.headers,
          ...options.headers
        },
        signal: controller.signal
      }
    );

    logApiResponse(endpoint, 200, Date.now() - startTime);
    return response;
  } catch (error) {
    logApiError(endpoint, error instanceof Error ? error : new Error('Unknown error'));
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}