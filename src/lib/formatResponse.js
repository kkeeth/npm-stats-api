/**
 * format a data object from npm API
 *
 * @param {String} statusCode: HTTP status code
 * @param {Object} formData: API response body
 */
 const formatResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    body: body,
  }
};

module.exports = formatResponse;