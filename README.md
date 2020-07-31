# npm-stats-api

Node Package's Statistics API

Our functions will provide statistics of node package.

This is a Node.js API wrapper for the NPM API and Registry.

`npm-stats-api` is based on the original `npm-stat-api`. `npm-stats-api` includes all the additional features from `npm-stat-api`.

# Installation

Install via NPM

```js

npm install npm-stats-api --save

```

# Example

i. Get Stats of Package

```js

const npm = require('npm-stat-api');

// Parameters:
// 1. Package Name
// 2. Start Date
// 3. End Date
npm.stat('check-stats-modules','2018-07-20','2018-08-20', (err, res) => {
   console.log(JSON.stringify(res))
});

```

ii. Get Details of Package

```js

const npm = require('npm-stats-api');

// Parameters:
// 1. Package name
npm.details('check-stats-modules', (err, res) => {
   console.log(JSON.stringify(res))
});

```

If you want to try it easily at hand, please clone this repository and run the `app.js` file on `nodejs`.

```bash
$ node app.js
```

# License

[MIT](https://github.com/kkeeth/npm-stats-api/blob/master/LICENSE)

# Any issue or want more features? Contact me!

This module has been tested under limited scenarios. If you find any issue please feel free to report via one of the below platforms:

Github: <a href="https://github.com/kkeeth/npm-stats-api/issues">npm-stats-api</a><br>
Email: zensin0082@gmail.com<br>
Twitter: <a href="https://twitter.com/kuwahara_jsri" target="_blank">@kuwahara_jsri</a>

