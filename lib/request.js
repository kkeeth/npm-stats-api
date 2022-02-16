'use strict'

var _superagent = _interopRequireDefault(require('superagent'))

var _formatResponse = _interopRequireDefault(require('./formatResponse'))

var _npmException = _interopRequireDefault(require('./npmException'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * Body module that calls the API
 *
 * @param {String} url: request URL with params
 * @returns {Object} object from npm API status code and response body
 */
var load = function load(url) {
  return _superagent.default
    .get(url)
    .timeout({
      response: 3 * 1000,
      deadline: 5 * 1000
    })
    .then(function (_ref) {
      var res = _ref.res,
        body = _ref.body
      return (0, _formatResponse.default)({
        statusCode: res.statusCode,
        body: body
      })
    })
    .catch(function (err) {
      var obj = new _npmException.default(err)
      throw obj
    })
}

module.exports = load
