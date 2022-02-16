'use strict'

/**
 * format a data object from npm API
 *
 * @param {Object} res: API response body
 * @returns {Object} object from npm API status code and response body
 */
var formatResponse = function formatResponse(res) {
  return {
    statusCode: res.statusCode,
    body: res.body
  }
}

module.exports = formatResponse
