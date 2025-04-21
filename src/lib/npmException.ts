/**
 * Custom Exception for npm-stats-api errors
 */
export class NpmException extends Error {
  public statusCode: number;
  public body: {
    path?: string;
    error?: string;
    message?: string;
    [key: string]: any;
  };

  /**
   * Create a new NpmException
   * 
   * @param {Error | object} error - Error object from API call
   */
  constructor(error: any) {
    super(error.message || 'Unknown NPM API error');
    this.name = 'NpmException';
    
    // Handle network errors
    if (!error.response) {
      this.statusCode = 500;
      this.body = {
        message: error.message || 'Network error',
        ...error
      };
      return;
    }
    
    // Handle HTTP errors
    if (error.status >= 400) {
      try {
        const errorResponse = error.response.error;
        const errorText = typeof errorResponse.text === 'string' 
          ? JSON.parse(errorResponse.text) 
          : errorResponse.text || {};
        
        this.statusCode = error.status;
        this.body = {
          path: errorResponse.path,
          ...errorText
        };
      } catch (parseError) {
        // Handle case where we can't parse the error response
        this.statusCode = error.status;
        this.body = {
          message: 'Error parsing API response',
          originalError: error.message
        };
      }
      return;
    }
    
    // Fallback for any other errors
    this.statusCode = 500;
    this.body = {
      message: 'Unknown error occurred',
      originalError: error.message
    };
  }
}
