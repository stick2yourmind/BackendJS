const { CartsDao, ProductsDao } = require('../models/daos/index')

const cartsDao = new CartsDao()
const productsDao = new ProductsDao()
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
  console.log('cartId')
  console.log(cartId)
  console.log('prodId')
  console.log(prodId)
  console.log('quantity')
  console.log('req.body')
  console.log(req.body)
  const product = await productsDao.getById(prodId)
  const price = product.precio
  const item = { _id: product._id, price, quantity: +quantity }
  console.log('item')
  console.log(item)
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
  createCart,
  deleteCartById,
  deleteProductFromCart,
  getCartById,
  getUserCarts
}
