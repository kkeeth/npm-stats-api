require("babel-polyfill");

import request, { ResponseError } from "superagent";
import formatResponse, { Response } from "./formatResponse";
import NpmException from "./npmException";

/**
 * Body module that calls the API
 *
 * @param {String} url: request URL with params
 * @returns {Object} object from npm API status code and response body
 */
const load = async (url: string): Promise<Response> => {
  try {
    const { statusCode, body } = await request
      .get(url)
      .timeout({
        response: 3 * 1000,
        deadline: 5 * 1000,
      });
    return formatResponse({
      statusCode: statusCode,
      body: body,
    });
  } catch (err) {
    throw new NpmException(err as ResponseError);
  }
};

export default load;
