const express = require('express')
const { PORT } = require('./config')
const apiRoutes = require('./routers/index')
const pageRoutes = require('./routers/pages')
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const app = express()
const passport = require('./middlewares/passport')
// const FileStore = require('session-file-store')(session)

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
  secret: 'palabra-secreta',
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://anker:tiXCScG6jgbKTXoP@coderhouse-ecommerce.mxktd.mongodb.net/sesiones?retryWrites=true&w=majority'
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
