const npm = require('./index')

npm.stat('check-stats-modules', '2018-01-01', '2019-05-01', (err, res) => {
   console.log(JSON.stringify(res))
})

npm.details('check-stats-modules', (err, res) => {
  console.dir(res.description)
})
