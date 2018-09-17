const npm = require('./index')

npm.stat('check-stats-modules', '2018-01-01', '2018-09-18', (err, res) => {
   console.log(JSON.stringify(res))
})
