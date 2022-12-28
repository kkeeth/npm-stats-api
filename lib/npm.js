'use strict'

var _request = _interopRequireDefault(require('./request'))
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}
module.exports = {
  /**
   * Get module stats
   *
   * @param {String} pkg: module name
   * @param {String} start: Start date of search period
   * @param {String} end: End date of search period
   * @returns Promise object
   */
  stat: function stat(pkg, start, end) {
    var url = 'https://api.npmjs.org/downloads/point/'
      .concat(start, ':')
      .concat(end, '/')
      .concat(pkg ? pkg : '')
    return (0, _request.default)(url)
  },
  /**
   * Get module detail info
   *
   * @param {String} pkg: module name
   * @returns Promise object
   */
  details: function details(pkg) {
    var url = 'https://registry.npmjs.org/'.concat(pkg ? pkg : '')
    return (0, _request.default)(url)
  }
}
