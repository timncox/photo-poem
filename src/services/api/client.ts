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
  const fullUrl = `${API_CONFIG.baseUrl}${endpoint}`;

  try {
    console.debug('[API] Request details:', {
      url: fullUrl,
      method: options.method || 'GET',
      headers: options.headers,
      timestamp: new Date().toISOString()
    });
    
    logApiRequest(endpoint, options);
    
    const response = await fetchWithRetry<T>(
      fullUrl,
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
    console.error('[API] Detailed error:', {
      url: fullUrl,
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : error,
      timestamp: new Date().toISOString()
    });
    
    logApiError(endpoint, error instanceof Error ? error : new Error('Unknown error'));
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}