[![npm version](https://badge.fury.io/js/npm-stats-api.svg)](https://badge.fury.io/js/npm-stats-api)
[![Code Climate](https://codeclimate.com/github/kkeeth/npm-stats-api/badges/gpa.svg)](https://codeclimate.com/github/kkeeth/npm-stats-api)
![node](https://img.shields.io/badge/node-%3E%3D%2020.18.3-brightgreen.svg?style=social)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

# npm-stats-api

Node Package's Statistics API

Our functions will provide statistics of node package.

This is a Node.js API wrapper for the NPM API and Registry.

`npm-stats-api` is based on the original `npm-stat-api`. `npm-stats-api` includes all the additional features from `npm-stat-api`.

# Installation

Install via NPM

```js

$ npm install npm-stats-api --save

```

# Usage

i. Get package's stats

```js
const npm = require("npm-stats-api");

// Parameters:
// 1. Package Name
// 2. Start Date
// 3. End Date
npm.stat("npm-stats-api", "2022-01-01", "2022-02-15")
  .then(res => {
    console.log(res);
  });

// if you use async/await
import npm from "npm-stats-api";
(async () => {
  const res = await npm.stat("npm-stats-api", "2022-01-01", "2022-02-15");
  console.log(res);
})();


// response format
{
  statusCode: 200,
  body: {
    downloads: 628,
    start: '2022-01-01',
    end: '2022-02-15',
    package: 'npm-stats-api'
  }
}
```

ii. Get package's details

```js
const npm = require("npm-stats-api");

// Parameters:
//   Package name
npm.details("npm-stats-api").then(res => {
  console.log(res);
});
```

iii. Error handling

```js
npm
  .stat("npm-stats-api", "2022-01-01", "2022-02-15")
  .then(res => console.log(res))
  .catch(err => {
    console.log(err);
  });

// use es module
const res = await npm.stat("npm-stats-api", "2022-01-01", "2022-02-15");
if (res.statusCode === 400) {
  // some kind of processing
}
```

If you want to try it easily at hand, please clone this repository and run the `app.js` file on `nodejs`.

```bash
$ node app.js
```

# ⚠ Limits ⚠

Bulk queries are limited to at most 128 packages at a time and at most 365 days of data.

All other queries are limited to at most 18 months of data. The earliest date for which data will be returned is January 10, 2015.

source (e.g. quotation): https://github.com/npm/registry/blob/master/docs/download-counts.md#limits

# License

[MIT](https://github.com/kkeeth/npm-stats-api/blob/master/LICENSE)

# Any issue or want more features? Contact me!

This module has been tested under limited scenarios. If you find any issue please feel free to report via one of the below platforms:

GitHub: <a href="https://github.com/kkeeth/npm-stats-api/issues">npm-stats-api</a><br>
Email: zensin0082@gmail.com<br>
Twitter: <a href="https://twitter.com/kuwahara_jsri" target="_blank">@kuwahara_jsri</a>
