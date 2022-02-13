import request from "superagent";

const load = (url) => {
  if (url === undefined) throw new Error("request URL is a required argument");

  return request
    .get(url)
    .timeout({
      response: 3 * 1000,
      deadline: 5 * 1000,
    })
    .then(res => res.body)
    .catch(err => err.response)
  };

module.exports = load;