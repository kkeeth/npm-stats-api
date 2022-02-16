/**
 * format a data object from npm API
 *
 * @param {Object} res: API response body
 * @returns {Object} object from npm API status code and response body
 */
 const formatResponse = (res) => ({
  statusCode: res.statusCode,
  body: res.body,
});

module.exports = formatResponse;