import "core-js/stable";

import request from "superagent";

import NpmException from "./npmException";
import type { ErrorType } from "../../index.d"

// Timeout configuration
const TIMEOUT_CONFIG = {
  response: 3 * 1000,
  deadline: 5 * 1000,
} as const;

/**
 * Body module that calls the API
 *
 * @param {String} url: request URL with params
 * @returns {Object} object from npm API status code and response body
 */
 const load = async (url: string) => {
  try {
    const { statusCode, body } = await request
      .get(url)
      .timeout(TIMEOUT_CONFIG);
    return {
      statusCode: statusCode,
      body: body,
    };
  } catch (err) {
    const obj: ErrorType = new NpmException(err as unknown)
    throw obj;
  }
};

export default load;
