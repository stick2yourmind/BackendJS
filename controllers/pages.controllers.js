const { UsersDao } = require('../models/daos/index')

const usersDao = new UsersDao()

const renderSign = async (req, res, next) => {
  console.log('req.session?.user: ', req.session?.user)
  if (req.session?.user) {
    console.log('redirigido a productos')
    res.redirect('./productos')
  } else { res.render('loginRegister') }
}

const renderProducts = async (req, res, next) => {
  try {
    if (req.session?.user) { res.render('products') } else { res.redirect('./login-register') }
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
  renderProducts,
  renderSign
}
