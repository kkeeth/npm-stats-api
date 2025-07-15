/**
 * Custom Exception definitions
 *
 * @param {Object} err: object from npm API status code and response body
 * @returns void
 */
type SuperagentError = {
  message: string;
  status?: number;
  response?: {
    error: {
      path: string;
      text: string;
    };
  };
  [key: string]: unknown;
};

export default class NpmException {
  message: string;
  name: string;
  statusCode: number;
  body: unknown;

  constructor(err: unknown) {
    // Type assertion for pragmatic implementation while maintaining unknown in public API
    const superagentErr = err as SuperagentError;

    this.message = superagentErr.message || 'Unknown error';
    this.name = 'NpmException';
    this.statusCode = 500; // default value
    this.body = {}; // default value

    // Network errors have response: undefined, API errors have response with error object
    if (!superagentErr.response || superagentErr.response === undefined) {
      this.statusCode = 500;
      this.body = {
        ...superagentErr
      };
    } else if (superagentErr.status && Number(superagentErr.status) >= 400) {
      const { error } = superagentErr.response!;
      this.statusCode = superagentErr.status;
      this.body = {
        path: error.path,
        ...JSON.parse(error.text),
      };
    }
  }
}
