const express = require('express')
const { PORT, PASSPORT_SECRET, DB_CONFIG, MODE, RunningMode } = require('./config')
const apiRoutes = require('./routers/index')
const pageRoutes = require('./routers/pages')
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const app = express()
const passport = require('./middlewares/passport')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const chalk = require('chalk')
const log = console.log

if (cluster.isMaster && (MODE === RunningMode.Cluster)) {
  log(chalk.bgHex('#DEADED').inverse('Cluster mode running'))
  log(chalk.bgHex('#DEADED').inverse(`Master is running with PID: ${process.pid}`))
  for (let i = 0; i < numCPUs; i++) { cluster.fork() }
}

if (!cluster.isMaster || (MODE === RunningMode.Fork)) {
  if (MODE === RunningMode.Fork) {
    log(chalk.bgHex('#DEADED').inverse('Fork mode running'))
  }
  log(chalk.bgHex('#DEADED').inverse(`Worker is running with PID: ${process.pid}`))
  // Setting path where views will be
  app.set('views', './views')
  // Connecting views with engine templates
  app.set('view engine', 'pug')

  // Middlewares
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static(path.resolve(__dirname, './public')))
  app.use(session({
    cookie: {
      hostOnly: true,
      maxAge: 600000,
      signed: true
    },
    name: 'ch-session',
    resave: false,
    saveUninitialized: false,
    secret: PASSPORT_SECRET,
    store: MongoStore.create({
      mongoUrl: DB_CONFIG.MONGO_ATLAS.uri
    }),
    ttl: 600
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  // Routes
  app.use('/api', apiRoutes)
  app.use('/', pageRoutes)
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
  })
}
