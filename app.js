const npm = require('./index')

// 200 ok pattern about 'stat' method
npm.stat('check-stats-modules', '2018-01-01', '2019-05-01', (_err, res) => {
   console.log("\n# ok pattern about stat method")
   console.log(JSON.stringify(res))
})

// 200 ok pattern about 'details' method
npm.details('check-stats-modules', (_err, res) => {
   console.log("\n# ok pattern about details method")
   console.log(res.description)
})

// date format error pattern about 'stat' method
npm.stat("check-stats-modules", 'hoge', '2019-05-01', (err, res) => {
   console.log("\n# date format error pattern about stat method")
   console.log(JSON.stringify(res))
   console.log(`${err.name}: ${err.message}`)
})

// not found error pattern about 'details' method
npm.stat("abcdefghijk", '2019-01-01', '2019-05-01', (err, res) => {
   console.log("\n# not found error pattern about details method")
   console.log(JSON.stringify(res))
   console.log(`${err.name}: ${err.message}`)
})
