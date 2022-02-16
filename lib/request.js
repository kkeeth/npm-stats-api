'use strict'

var _superagent = _interopRequireDefault(require('superagent'))

require('babel-polyfill')

var _formatResponse = _interopRequireDefault(require('./formatResponse'))

var _npmException = _interopRequireDefault(require('./npmException'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg)
    var value = info.value
  } catch (error) {
    reject(error)
    return
  }
  if (info.done) {
    resolve(value)
  } else {
    Promise.resolve(value).then(_next, _throw)
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args)
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value)
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err)
      }
      _next(undefined)
    })
  }
}

/**
 * Body module that calls the API
 *
 * @param {String} url: request URL with params
 * @returns {Object} object from npm API status code and response body
 */
var load = /*#__PURE__*/ (function () {
  var _ref = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(url) {
      var _yield$request$get$ti, res, body, obj

      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.prev = 0
                _context.next = 3
                return _superagent.default.get(url).timeout({
                  response: 3 * 1000,
                  deadline: 5 * 1000
                })

              case 3:
                _yield$request$get$ti = _context.sent
                res = _yield$request$get$ti.res
                body = _yield$request$get$ti.body
                return _context.abrupt(
                  'return',
                  (0, _formatResponse.default)({
                    statusCode: res.statusCode,
                    body: body
                  })
                )

              case 9:
                _context.prev = 9
                _context.t0 = _context['catch'](0)
                obj = new _npmException.default(_context.t0)
                throw obj

              case 13:
              case 'end':
                return _context.stop()
            }
          }
        },
        _callee,
        null,
        [[0, 9]]
      )
    })
  )

  return function load(_x) {
    return _ref.apply(this, arguments)
  }
})()

module.exports = load
