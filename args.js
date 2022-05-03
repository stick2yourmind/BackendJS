const yargs = require('yargs/yargs')

const args = yargs(process.argv.slice(2))
  .alias({
    o: 'port',
    p: 'mongoPassword',
    u: 'mongoUser'
  })
  .default({
    port: 8090
  })
  .argv

console.log(args)
