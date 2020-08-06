'use strict'

var request = require('request')

module.exports = {
  load: function load(url, cb) {
    try {
      if (cb === undefined) throw 'callback function is a required argument'
      request(
        {
          url: url,
          json: true
        },
        function(err, res, body) {
          if (!err) {
            var status = null

            switch (res.statusCode) {
              case 400:
                status = 'Invalid data'
                break

              case 404:
                status = 'Package not found'
                break

              case 412:
                status = 'Precondition failed'
                break
            }

            cb(status, body)
          } else {
            throw err.message
          }
        }
      )
    } catch (e) {
      throw new Error(e)
    }
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
