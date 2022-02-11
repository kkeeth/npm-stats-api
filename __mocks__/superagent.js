'use strict';
const dayjs = require('dayjs');

const statMethodBaseURL = "https://api.npmjs.org/downloads/point/"
const detailsMethodBaseURL = "https://registry.npmjs.org/"

const isValidDate = (dateStr, format = "YYYY-MM-DD") => {
  const formatDate = dayjs(dateStr, format).format(format);
  return dateStr === formatDate
};

const isValidURL = (urlStr) => {
  const regexpURL = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g;
  return regexpURL.test(urlStr);
};

const getDateFromURL = (urlStr) => {
  const regexpURL = new RegExp(`${statMethodBaseURL}(.*):(.*)`);
  const matches = urlStr.match(regexpURL)
  console.log(matches)
};

const usualReturn = {
  statusCode: 200,
  status: 200,
  body: {
    downloads: 1053,
    start: '2018-01-01',
    end: '2019-05-01',
    package: 'check-stats-modules'
  }
}

const superagent = {
  get: (urlStr) => {
    if (!isValidURL(urlStr)) throw new Error(`getaddrinfo ENOTFOUND ${urlStr}`)
    return getDateFromURL(urlStr)
    // if (isValidDate())
  },
  timeout: jest.fn(),
  end: (res) => {
    return Promise.resolve().then(() => {
      return "hoge"
    })
  }
}


module.exports = superagent;