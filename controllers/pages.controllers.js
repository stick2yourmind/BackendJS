const yargs = require('yargs/yargs')
const { UsersDao, ProductsDao } = require('../models/daos/index')
require('dotenv').config()
const os = require('os')

const products = new ProductsDao()
const user = new UsersDao()

const args = yargs(process.argv.slice(2))
  .alias({
    o: 'port',
    p: 'mongoPassword',
    u: 'mongoUser'
  })
  .argv

const renderCart = async (req, res, next) => {
  try {
    if (req?.user) { res.render('cart') } else { res.redirect('./login-register') }
  } catch (error) {
    next(error)
  }
}

const renderSign = async (req, res, next) => {
  if (req.session?.user) {
    console.log('redirigido a productos')
    res.redirect('./productos')
  } else { res.render('loginRegister') }
}

const renderProfile = async (req, res, next) => {
  console.log('req.session.passport.user')
  console.log(req.session.passport.user)
  const userInfo = await user.getById(req.session.passport.user).then(info => info)
  const userInfoToRender = {
    address: userInfo.address,
    age: userInfo.age,
    avatar: userInfo.avatar.replace(/\\/g, '/').replace('public', `${process.env.DOMAIN}`),
    email: userInfo.email,
    name: userInfo.name,
    phone: userInfo.phone
  }
  console.log('userInfoToRender')
  console.log(userInfoToRender)
  if (req.session?.user) {
    console.log('renderProfile: redirigido a productos')
    console.log('req.session?.user', req.session?.user)
    res.redirect('./productos')
  } else { res.render('profile', { userInfoToRender: userInfoToRender }) }
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
  const allProducts = await products.getAll().then(products => products)
  try {
    if (req?.user) { res.render('products', { allProducts: allProducts }) } else { res.redirect('./login-register') }
  } catch (error) {
    next(error)
  }
}

const renderProductDetails = async (req, res, next) => {
  const productId = req.params.productId
  const product = await products.getById(productId).then(product => product)
  // product = { ...product, descripcion: product.descripcion.replace(/\n/g, String.fromCharCode(10)) }
  try {
    if (req?.user) { res.render('productDetails', { product: product }) } else { res.redirect('/productos') }
  } catch (error) {
    next(error)
  }
}

const logoutUser = async (req, res) => {
  req.session.destroy(error => {
    if (!error) res.redirect('./login-register')
  })
}

module.exports = {
  logoutUser,
  renderCart,
  renderInfo,
  renderInfoZip,
  renderLoginError,
  renderProductDetails,
  renderProducts,
  renderProfile,
  renderRegisterError,
  renderSign
}
