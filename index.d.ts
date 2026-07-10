/**
 * Error response structure
 */
export interface ErrorResponse {
  message: string;
  name: string;
  statusCode: number;
  body: {
    path?: string;
    error?: string;
    message?: string;
    [key: string]: any;
  };
}

/**
 * Package download statistics response
 */
export interface StatResponse {
  statusCode: number;
  body: {
    downloads: number;
    start: string;
    end: string;
    package: string;
  };
}

/**
 * Package details response
 */
export interface DetailResponse {
  statusCode: number;
  body: {
    _id?: string;
    name?: string;
    description?: string;
    version?: string;
    author?: {
      name?: string;
      email?: string;
      url?: string;
    };
    homepage?: string;
    license?: string;
    repository?: {
      type?: string;
      url?: string;
    };
    versions?: Record<string, any>;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    [key: string]: any;
  };
}

/**
 * Custom error class for npm-stats-api errors
 */
export class NpmException extends Error {
  statusCode: number;
  body: {
    path?: string;
    error?: string;
    message?: string;
    [key: string]: any;
  };
  
  constructor(error: any);
}

/**
 * Get package download statistics 
 * 
 * @param packageName - NPM package name
 * @param startDate - Start date in YYYY-MM-DD format
 * @param endDate - End date in YYYY-MM-DD format
 */
export function stat(packageName: string, startDate: string, endDate: string): Promise<StatResponse>;

/**
 * Get package details
 * 
 * @param packageName - NPM package name
 */
export function details(packageName: string): Promise<DetailResponse>;
