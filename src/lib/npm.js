const request = require('request')

module.exports = {
   load: function(url, cb) {
      request({
         url: url,
         json: true
      }, (err, res, body) => {
         if (!err && res.statusCode === 200) {
            cb(null, body)
         }
         else if (!err && res.statusCode === 404) {
            cb('Package not found', body)
         }
         else {
            // server or network error is occured
            cb('Error', "An error has occurred. Please try again later, sorry.")
         }
      })
   },
   stat: function(pkg, start, end, cb) {
      const url = `https://api.npmjs.org/downloads/point/${start}:${end}/${pkg}`
      return this.load(url, cb)
   },
   details: function(pkg, cb) {
      const url = `https://registry.npmjs.org/${pkg}`
      return this.load(url, cb)
   }
}
