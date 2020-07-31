'use strict'

var request = require('request')

module.exports = {
  load: function load(url, cb) {
    request(
      {
        url: url,
        json: true
      },
      function(err, res, body) {
        if (!err) {
          var message = null

          switch (res.statusCode) {
            case 400:
              message = 'Invalid data'
              break

            case 404:
              message = 'Package not found'
              break

            case 412:
              message = 'Precondition failed'
              break
          }

          cb(message, body)
        } else {
          cb('Error', 'An error has occurred. Please try again later, sorry')
        }
      }
    )
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
