import request from "superagent";

export default (url, cb) => {
  if (cb === undefined) throw new Error("callback function is a required argument");

  request
    .get(url)
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
};