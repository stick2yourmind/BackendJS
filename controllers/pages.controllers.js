const yargs = require('yargs/yargs')
const { UsersDao } = require('../models/daos/index')
require('dotenv').config()
const { fork } = require('child_process')
const { MODE, RunningMode } = require('../config')
const blockingProcess = require('./blockProcess')
const os = require('os')

const args = yargs(process.argv.slice(2))
  .alias({
    o: 'port',
    p: 'mongoPassword',
    u: 'mongoUser'
  })
  .argv
const usersDao = new UsersDao()

const renderRandoms = async (req, res, next) => {
  const queryQuant = req.query?.cant ?? 100e6
  if (MODE === RunningMode.Fork) {
    const blockingCount = fork('./controllers/blockProcess.js')
    blockingCount.send(queryQuant)
    blockingCount.on('message', (data) => {
      res.send({ data })
    })
  } else { res.send({ data: blockingProcess(queryQuant) }) }
}

const renderSign = async (req, res, next) => {
  if (req.session?.user) {
    console.log('redirigido a productos')
    res.redirect('./productos')
  } else { res.render('loginRegister') }
}

const renderRegisterError = async (req, res, next) => {
  res.render('registerError')
}
const renderInfo = (req, res, next) => {
  const info = [{
    description: String.toString(args),
    title: 'Argumentos de entrada'
  },
  {
    description: process.platform,
    title: 'Nombre de la plataforma (sistema operativo)'
  },
  {
    description: process.version,
    title: 'Versión de node.js'
  },
  {
    description: process.memoryUsage.rss(),
    title: 'Memoria total reservada (rss)'
  },
  {
    description: process.execPath,
    title: 'Path de ejecución'
  },
  {
    description: process.pid,
    title: 'PID'
  },
  {
    description: process.cwd(),
    title: 'Carpeta contenedora'
  },
  {
    description: os.cpus().length,
    title: 'Cantidad de procesadores'
  }]
  // console.log(info)
  res.render('info', { info: info })
}

const renderInfoZip = async (req, res, next) => {
  const info = [{
    description: String.toString(args),
    title: 'Argumentos de entrada'
  },
  {
    description: process.platform,
    title: 'Nombre de la plataforma (sistema operativo)'
  },
  {
    description: process.version,
    title: 'Versión de node.js'
  },
  {
    description: process.memoryUsage.rss(),
    title: 'Memoria total reservada (rss)'
  },
  {
    description: process.execPath,
    title: 'Path de ejecución'
  },
  {
    description: process.pid,
    title: 'PID'
  },
  {
    description: process.cwd(),
    title: 'Carpeta contenedora'
  },
  {
    description: os.cpus().length,
    title: 'Cantidad de procesadores'
  }]
  res.render('info', { info: info })
}
const renderLoginError = async (req, res, next) => {
  res.render('LoginError')
}

const renderProducts = async (req, res, next) => {
  try {
    if (req?.user) { res.render('products') } else { res.redirect('./login-register') }
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, email, password) => {
  console.log({ email, password })
  try {
    const user = await usersDao.getByEmail(email)
    if (user?.password === password) {
      req.session.user = email
      res.render('products')
    } else res.render('loginRegister')
  } catch (error) {
    res.render('loginRegister')
  }
}

const logoutUser = async (req, res) => {
  req.session.destroy(error => {
    if (!error) res.redirect('./login-register')
  })
}

const register = async (req, res, email, password, passwordConfirmation, alias, nombre, apellido) => {
  console.log({ alias, apellido, email, nombre, password, passwordConfirmation })
  try {
    if (password === passwordConfirmation) {
      const user = { alias, apellido, email, nombre, password }
      await usersDao.create(user)
      req.session.user = email
      res.render('products')
    } else res.render('loginRegister')
  } catch (error) {
    res.render('loginRegister')
  }
}
const auth = {
  login,
  register
}

const authUser = async (req, res, next) => {
  const { email, password, passwordConfirmation, alias, nombre, apellido } = req.body
  if (passwordConfirmation === undefined) {
    auth.login(req, res, email, password)
  } else auth.register(req, res, email, password, passwordConfirmation, alias, nombre, apellido)
}

module.exports = {
  authUser,
  logoutUser,
  renderInfo,
  renderInfoZip,
  renderLoginError,
  renderProducts,
  renderRandoms,
  renderRegisterError,
  renderSign
}
