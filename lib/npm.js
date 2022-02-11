'use strict'

var request = require('superagent')

module.exports = {
  load: function load(url, cb) {
    if (url === undefined) throw new Error('request URL is a required argument')
    if (cb === undefined)
      throw new Error('callback function is a required argument')
    request
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
  },
  stat: function stat(pkg, start, end, cb) {
    var url = 'https://api.npmjs.org/downloads/point/'
      .concat(start, ':')
      .concat(end, '/')
      .concat(pkg)
    this.load(url, cb)
  },
  details: function details(pkg, cb) {
    var url = 'https://registry.npmjs.org/'.concat(pkg)
    this.load(url, cb)
  }
}
