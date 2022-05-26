const { CartsDao, ProductsDao, UsersDao } = require('../models/daos/index')
const nodemailer = require('nodemailer')
const { SERVICE_EMAIL } = require('../config')
const pug = require('pug')

const transporter = nodemailer.createTransport({
  auth: {
    pass: SERVICE_EMAIL.pass,
    user: SERVICE_EMAIL.user
  },
  port: SERVICE_EMAIL.port,
  service: SERVICE_EMAIL.service
})

const mailOptions = (to, subject, html) => ({
  from: 'Node JS Server',
  html,
  subject,
  to
})

const cartsDao = new CartsDao()
const productsDao = new ProductsDao()
const usersDao = new UsersDao()
/**
 * Get all carts from a user, server receives an empty JSON.
 *
 * @param {Object} req - To get <user> attribute.
 * @param {Object} res - To set a response.
 * @param {Function} next - Used for error handling.
 * @returns {Object} attribute result contains all user's carts.
 * Example of JSON received, at server:
 * {
 * }
 */
const getUserCarts = async (req, res, next) => {
  const userId = req.session.passport.user
  try {
    const carts = await cartsDao.getBy('user', userId)
    res.json({ result: carts, success: true })
  } catch (error) {
    next(error)
  }
}
/**
 * Creates a new cart for a user
 *
 * @param {Object} req - To get <user> attribute.
 * @param {Object} res - To set a response.
 * @param {Function} next - Used for error handling.
 * @returns {Object} new cart if success or JSON error if not.
 * Example of JSON received, at server:
 * {
 * }
 */
const createCart = async (req, res, next) => {
  const userId = req.session.passport.user
  try {
    const newCart = await cartsDao.create({ user: userId })
    res.json({ result: newCart, success: true })
  } catch (error) {
    next(error)
  }
}

const closeCartById = async (req, res, next) => {
  const userId = req.session.passport.user
  const { cartId } = req.params
  try {
    const user = await usersDao.getById(userId)
    const cart = await cartsDao.getById(cartId)
    const products = await Promise.all(cart.products.map(async product => {
      const productFromDB = await productsDao.getById(product._id)
      const productToReturn = { price: product.price, quantity: product.quantity, title: productFromDB.nombre }
      return productToReturn
    }))
    const subject = `Nuevo pedido de ${user.name} - ${user.email} `
    const html = pug.renderFile('newCheckout.pug', {
      cartId: cartId,
      products: products
    })
    transporter.sendMail(mailOptions(SERVICE_EMAIL.user, subject, html))
    transporter.sendMail(mailOptions(user.email, 'Estamos preparando tu pedido', html))
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
}

const deleteCartById = async (req, res, next) => {
  const { id } = req.params
  try {
    const deletedCart = await cartsDao.deleteById(id)
    res.json({ result: deletedCart, success: true })
  } catch (error) {
    next(error)
  }
}

const getCartById = async (req, res, next) => {
  const { id } = req.params
  console.log('id: ', id)
  try {
    const cart = await cartsDao.getById(id, 'products', '_id nombre descripcion codigo foto precio stock')
    res.json({ cart, success: true })
  } catch (error) {
    next(error)
  }
}
/**
 * Add product to a cart, needed product's id and its quantity ordered, and cart's id.
 * @name  addProductToCart
 * @function
 * @param {Object} req - To get product's id and its quantity ordered, and cart's id.
 * @param {Object} res - To set a response.
 * @param {Function} next - Used for error handling.
 * @returns {Object} Updated cart if success or JSON error if not.
 * Example of JSON received, at server:
 * {
 *   "quantity": "8"
 * }
 */
const addProductToCart = async (req, res, next) => {
  // verify <userId> with "const userId = req.session.passport.user"
  // if its own the cart
  const { params: { cartId }, body: { prodId, quantity } } = req
  const product = await productsDao.getById(prodId)
  const price = product.precio
  const item = { _id: product._id, price, quantity: +quantity }
  try {
    const updatedCart = await cartsDao.addItemToArray(cartId, item, 'products')
    res.json({ result: updatedCart, success: true })
  } catch (error) {
    next(error)
  }
}

// db.carts.updateOne({}, { $pull: { products:  { codigo: 1 } } } )

const deleteProductFromCart = async (req, res, next) => {
  const { params: { id, idProd } } = req
  try {
    const updatedCart = await cartsDao.removeItemFromArray(id, idProd, 'products')
    res.json({ result: updatedCart, success: true })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addProductToCart,
  closeCartById,
  createCart,
  deleteCartById,
  deleteProductFromCart,
  getCartById,
  getUserCarts
}
