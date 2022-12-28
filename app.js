const npm = require("./lib");

// 200 ok pattern about 'stat' method
npm
  .stat("npm-stats-api", "2022-01-01", "2022-02-15")
  .then(res => {
    console.log("\n# ok pattern about stat method");
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });

// 200 ok pattern about 'details' method
npm
  .details("npm-stats-api")
  .then(res => {
    console.log("\n# ok pattern about stat method");
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });

// date format error pattern about 'stat' method
npm
  .stat("npm-stats-api", "hoge", "2022-02-15")
  .then(res => {
    console.log("\n# date format error pattern about stat method");
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });

// not found error pattern about 'details' method
npm
  .stat("abcdefghijk", "2019-01-01", "2022-02-15")
  .then(err => {
    console.log("\n# not found error pattern about details method");
    console.log(err);
  })
  .catch(err => {
    console.log(err);
  });
