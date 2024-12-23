import { API_CONFIG } from './config';
import { fetchWithRetry } from './retry';

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  try {
    return await fetchWithRetry<T>(
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
  } finally {
    clearTimeout(timeoutId);
  }
}