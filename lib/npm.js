'use strict'

const request = require('request')

module.exports = {
  load: function(url, cb) {
    request(
      {
        url: url,
        json: true
      },
      (err, res, body) => {
        if (!err) {
          let message = null

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
  stat: function(pkg, start, end, cb) {
    const url = `https://api.npmjs.org/downloads/point/${start}:${end}/${pkg}`
    this.load(url, cb)
  },
  details: function(pkg, cb) {
    const url = `https://registry.npmjs.org/${pkg}`
    this.load(url, cb)
  }
}
