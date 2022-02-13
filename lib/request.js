'use strict'

var _superagent = _interopRequireDefault(require('superagent'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

var load = function load(url) {
  if (url === undefined) throw new Error('request URL is a required argument')
  return _superagent.default
    .get(url)
    .timeout({
      response: 3 * 1000,
      deadline: 5 * 1000
    })
    .then(function (res) {
      return res.body
    })
    .catch(function (err) {
      return err.response
    })
}

module.exports = load
