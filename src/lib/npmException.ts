import type { ResponseError } from "superagent";

/**
 * Custom Exception definitions
 */
export default class NpmException {
  readonly message: string;
  readonly name: string
  readonly statusCode?: number;
  readonly body?: object;

  /**
   * @param err: object from npm API status code and response body
   */
  constructor(err: ResponseError) {
    this.message = err.message;
    this.name = 'NpmException';

    if (!err.response) {
      this.statusCode = 500;
      this.body = { ...err };
    } else if (Number(err.status) >= 400) {
      const { error } = err.response as unknown as { error: { path: string, text: string } };
      this.statusCode = err.status!;
      this.body = {
        path: error.path,
        ...JSON.parse(error.text),
      };
    }
  }
}
