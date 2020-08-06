const request = require("request");

module.exports = {
  load: function(url, cb) {
    try {
      if (cb === undefined) throw "callback function is a required argument";

      request({ url: url, json: true }, (err, res, body) => {
        if (!err) {
          let status = null;
          switch (res.statusCode) {
            case 400:
              status = "Invalid data";
              break;
            case 404:
              status = "Package not found";
              break;
            case 412:
              status = "Precondition failed";
              break;
          }
          cb(status, body);
        } else {
          throw err.message;
        }
      });
    } catch (e) {
      throw new Error(e);
    }
  },
  stat: function(pkg, start, end, cb) {
    const url = `https://api.npmjs.org/downloads/point/${start}:${end}/${pkg}`;
    this.load(url, cb);
  },
  details: function(pkg, cb) {
    const url = `https://registry.npmjs.org/${pkg}`;
    this.load(url, cb);
  },
};
