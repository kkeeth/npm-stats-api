const npm = require('./index')

// 'stat' method's 200 ok pattern
npm.stat('check-stats-modules', '2018-01-01', '2019-05-01', (err, res) => {
   console.log("\n# ok pattern about stat method")
   console.log(JSON.stringify(res))
})

// 'details' method's 200 ok pattern
npm.details('check-stats-modules', (err, res) => {
   console.log("\n# ok pattern about details method")
   console.log(res.description)
})

// date format error pattern
npm.stat("check-stats-modules", 'hoge', '2019-05-01', (err, res) => {
   console.log("\n# date format error pattern about stat method")
   console.log(JSON.stringify(res))
   console.log(`${err.name}: ${err.message}`)
})

// URL error pattern
npm.load("hoge", (err, res) => {
   console.log("\n# URL error pattern about load method")
   console.log(`${err.name}: ${err.message}`)
})
