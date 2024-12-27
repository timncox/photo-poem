import { API_CONSTANTS } from './constants';
import { ApiError } from '../errors';
import { sleep } from '../../utils/async';

export async function fetchWithRetry<T>(
  url: string,
  options: RequestInit,
  attempt = 1
): Promise<T> {
  try {
    console.debug(`[API] Attempt ${attempt} for ${url}`);
    
    const response = await fetch(url, options);
    
    console.debug('[API] Response details:', {
      url,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      attempt
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new ApiError(
        response.status,
        error.error || `Server error (${response.status})`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('[API] Retry error details:', {
      url,
      attempt,
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : error
    });

    if (attempt >= API_CONSTANTS.RETRY.MAX_ATTEMPTS) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new ApiError(503, 'Server is currently unavailable. Please try again later.');
      }
      throw error;
    }
    
    const delay = API_CONSTANTS.RETRY.DELAY * Math.pow(API_CONSTANTS.RETRY.BACKOFF_FACTOR, attempt - 1);
    console.debug(`[API] Retrying in ${delay}ms (attempt ${attempt})`);
    await sleep(delay);
    return fetchWithRetry<T>(url, options, attempt + 1);
  }
}