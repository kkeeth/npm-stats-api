import { NpmException } from './npmException';

/**
 * Timeout for fetch request
 */
const TIMEOUT_MS = 5000;

/**
 * Custom fetch with timeout
 * 
 * @param {string} url - URL to fetch
 * @param {RequestInit} options - fetch options
 * @param {number} timeout - timeout in milliseconds
 * @returns {Promise<Response>} - fetch response
 */
const fetchWithTimeout = async (
  url: string, 
  options: RequestInit = {}, 
  timeout: number = TIMEOUT_MS
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
};

/**
 * Fetch data from NPM API
 * 
 * @template T - Response type
 * @param {string} url - API URL
 * @returns {Promise<T>} - Response data
 * @throws {NpmException} - Error during fetch
 */
export const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetchWithTimeout(url);
    
    if (!response.ok) {
      throw {
        status: response.status,
        response: {
          error: {
            path: url,
            text: await response.text()
          }
        }
      };
    }
    
    const body = await response.json();
    
    return {
      statusCode: response.status,
      body
    } as unknown as T;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new NpmException({
        message: 'Request timeout exceeded',
        status: 408
      });
    }
    
    throw new NpmException(error);
  }
};
