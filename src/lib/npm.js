const request = require("superagent");

module.exports = {
  load: function(url, cb) {
    if (cb === undefined) throw new Error("callback function is a required argument");

    request
      .get(url)
      .set('accept', 'json')
      .timeout({
        response: 3 * 1000,
        deadline: 5 * 1000,
      })
      .end((err, res) => {
        if (!res) {
          // for 5xx error
          cb(err, res);
        } else if (err) {
          // for 4xx error
          cb(err, res.body)
        } else {
          // for 200 ok
          cb(null, res.body);
        }
      });
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
