'use strict'

var _request = _interopRequireDefault(require('./request'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

var checkProperties = function checkProperties(pkg, cb) {
  if (!pkg) {
    throw new Error('package name is a required argument')
  }

  if (!cb) {
    throw new Error('callback function is a required argument')
  }
}

module.exports = {
  stat: function stat(pkg, start, end, cb) {
    checkProperties(pkg, cb)
    var url = 'https://api.npmjs.org/downloads/point/'
      .concat(start, ':')
      .concat(end, '/')
      .concat(pkg)
    ;(0, _request.default)(url, cb)
  },
  details: function details(pkg, cb) {
    checkProperties(pkg, cb)
    var url = 'https://registry.npmjs.org/'.concat(pkg)
    ;(0, _request.default)(url, cb)
  }
}
