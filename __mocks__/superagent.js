'use strict';
const dayjs = require('dayjs');

const statMethodBaseURL = "https://api.npmjs.org/downloads/point/"
const detailsMethodBaseURL = "https://registry.npmjs.org/"

const isValidDate = (dateStr, format = "YYYY-MM-DD") => {
  const formatDate = dayjs(dateStr, format).format(format);
  return dateStr === formatDate
};

const isValidURL = (urlStr) => {
  const regexpStatURL = new RegExp(statMethodBaseURL);
  const regexpDetailsURL = new RegExp(detailsMethodBaseURL);
  return regexpStatURL.test(urlStr) || regexpDetailsURL.test(urlStr);
};

const getDateFromURL = (urlStr) => {
  const regexpURL = new RegExp(`${statMethodBaseURL}(.*):(.*)/.*`);
  const matches = urlStr.match(regexpURL);
  return [matches[1], matches[2]];
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

const errorReturn = (err) => ({
  ...err,
  errno: -3008,
  code: 'ENOTFOUND',
  syscall: 'getaddrinfo',
  hostname: 'api.npmjs.org',
  response: undefined
});

const superagent = {
  get: (urlStr) => ({
    timeout: () => ({
      end: () => {
        if (!isValidURL(urlStr))
          throw new Error(`getaddrinfo ENOTFOUND ${urlStr}`);

        const [start, end] = getDateFromURL(urlStr)
        if (isValidDate(start) && isValidDate(end)) {
          return {
            ...jest.fn().mockResolvedValue(usualReturn)
          }
        } else {
          return {
            ...jest.fn().mockRejectedValue(errorReturn(new Error(`getaddrinfo ENOTFOUND ${urlStr}`)))
          }
        }
      }
    })
  })
};

module.exports = superagent;