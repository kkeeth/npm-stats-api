'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

var _superagent = _interopRequireDefault(require('superagent'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

var _default = function _default(url, cb) {
  if (cb === undefined)
    throw new Error('callback function is a required argument')

  _superagent.default
    .get(url)
    .timeout({
      response: 3 * 1000,
      deadline: 5 * 1000
    })
    .end(function (err, res) {
      if (!res) {
        // for 5xx error
        cb(err, res)
      } else if (err) {
        // for 4xx error
        cb(err, res.body)
      } else {
        // for 200 ok
        cb(null, res.body)
      }
    })
}

exports.default = _default
