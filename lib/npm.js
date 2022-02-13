'use strict'

var _request = _interopRequireDefault(require('./request'))

var _formatResponse = _interopRequireDefault(require('./formatResponse'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

module.exports = {
  stat: function stat(pkg, start, end) {
    if (!pkg) {
      return Promise.reject().catch(function () {
        return (0,
        _formatResponse.default)(400, Error('package name is a required argument'))
      })
    }

    var url = 'https://api.npmjs.org/downloads/point/'
      .concat(start, ':')
      .concat(end, '/')
      .concat(pkg)
    return (0, _request.default)(url).then(function (ret) {
      return (0, _formatResponse.default)(ret.status, ret)
    })
  },
  details: function details(pkg) {
    if (!pkg) {
      return Promise.reject().catch(function () {
        return (0,
        _formatResponse.default)(400, Error('package name is a required argument'))
      })
    }

    var url = 'https://registry.npmjs.org/'.concat(pkg)
    return (0, _request.default)(url).then(function (ret) {
      return (0, _formatResponse.default)(ret.status, ret)
    })
  }
}
