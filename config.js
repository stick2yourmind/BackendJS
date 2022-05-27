require('dotenv').config()
const yargs = require('yargs/yargs')

const enumerator = (owner, ...params) => {
  for (let i = 1; i < params.length + 1; i++) {
    owner[params[i - 1]] = i
  }
}
/* eslint-disable */
let RunningMode = []
/* eslint-enable  */
enumerator(RunningMode, 'Cluster', 'Fork')
// console.log('Mode.Fork: ', Mode.Fork)

const args = yargs(process.argv.slice(2))
  .alias({
    m: 'mode',
    o: 'port',
    p: 'mongoPassword',
    u: 'mongoUser'
  })
  .default({
    mode: RunningMode.Fork,
    port: 8080
  })
  .argv

console.log('args: ', args)

module.exports = {
  DB_CONFIG: {
    MONGO: {
      options: null,
      uri: process.env.MONGO_URI || 'mongodb://localhost/ecommerce'
    },
    MONGO_ATLAS: {
      options: null,
      uri: process.env.MONGO_ATLAS_URI || ''
    }
  },
  HOST: process.env.HOST,
  MODE: args.mode,
  PASSPORT_SECRET: process.env.PASSPORT_SECRET || '',
  PERS: process.env.PERS || 'MONGO',
  PORT: args.port || process.env.PORT,
  RunningMode,
  SERVICE_EMAIL: {
    pass: process.env.SELLER_EMAIL_PASS || '',
    port: 465,
    service: 'gmail',
    user: process.env.SELLER_EMAIL || ''
  },
  TWILIO: {
    ACCOUNT: process.env.TWILIO_ACCOUNT,
    SMS: process.env.TWILIO_SMS,
    TOKEN: process.env.TWILIO_TOKEN,
    WHATSAPP: process.env.TWILIO_WHATSAPP
  }
}
