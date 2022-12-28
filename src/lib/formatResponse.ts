export type Response = {
  statusCode: number,
  body: unknown,
};

/**
 * format a data object from npm API
 *
 * @param {Response} res: API response body
 * @returns {Response} object from npm API status code and response body
 */
const formatResponse = (res: Response): Response => ({
  statusCode: res.statusCode,
  body: res.body,
});

export default formatResponse;
