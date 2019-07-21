const request = require('request')

module.exports = {
   load: function(url, cb) {
      request({
         url: url,
         json: true
      }, (err, res, body) => {
        if (!err) {
           switch(res.statusCode) {
              case 200:
                 cb(null, body)
                 break
              case 400:
                 cb('Invalid data', body)
                 break
              case 404:
                 cb('Package not found', body)
                 break
              case 412:
                 cb('Precondition failed', body)
                 break
           }
        } else {
          cb('Error', 'An error has occurred. Please try again later, sorry')
        }
      })
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
