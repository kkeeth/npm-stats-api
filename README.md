# npm-stats-api

Node Package's Statistics API

Our functions will provide statistics of node package.

This is a Node.js API wrapper for the NPM API and Registry.

`npm-stats-api` is based on the original `npm-stat-api`. `npm-stats-api` includes all the additional features from `npm-stat-api`.

# Installation

Install via NPM

```js

npm install npm-stat-api --save

```

# Example

i. Get Stats of Package

```js

var npm = require('npm-stat-api');

// Parameters:
// 1. Package Name
// 2. Start Date
// 3. End Date
npm.stat('check-stats-modules','2018-07-20','2018-08-20', function(err, response){
   console.log(JSON.stringify(response));
});

```

ii. Get Details of Package

```js

var npm = require('npm-stat-api');

// Parameters:
// 1. Package name
npm.details('check-stats-modules', function(err, response){
   console.log(JSON.stringify(response));
});

```

# License

[MIT](https://github.com/k-kuwahara/npm-stats-api/blob/master/LICENSE)

# Any issue or want more features? Contact me!

This module has been tested under limited scenarios. If you find any issue please feel free to report via one of the below platforms:

Github: <a href="https://github.com/k-kuwahara/npm-stats-api/issues">npm-stats-api</a><br>
Email: zensin0082@gmail.com<br>
Twitter: @kuwahara_jsri

