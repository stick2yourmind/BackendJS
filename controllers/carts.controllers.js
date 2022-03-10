const { CartsApi } = require('../models/index')
const { products } = require('./products.controllers')

const carts = new CartsApi()

const errorNotFound = (baseUrl,path, method) => ({ 
  error: -2,
  descripcion: `Ruta ${baseUrl}${path} del método ${method} no implementada`
})

/**
 * List all products from a cart. Route: /api/carrito/:id/productos.
 * @param {string} id - The cart's id.
 * @return {array} The products from cart selected.
 */
 const createCartController = ({res}) => {
  const newCartId = carts.create()
  carts.listAll()
  return res.json(newCartId)
}

const deleteCartController = (req, res) => {
  const { idCart } = req.params
  const cartDeleted = carts.deleteCart(idCart)
  if (cartDeleted.error) return res.status(404).send(cartDeleted.error)
  carts.listAll()
  return res.json(cartDeleted)
}

const listAllProductsByIdCartController = (req, res) => {
  const { idCart } = req.params
  const cartProducts = carts.listByID(idCart)
  if (cartProducts.error) return res.status(404).send(cartProducts.error)
  carts.listAll()
  return res.json(cartProducts)
}

const addProductToCartController = (req, res) => {
  const { idCart } = req.params
  const productToAdd = req.body
  const productAdded = carts.addProductById(idCart, productToAdd, products)
  if (productAdded.error) return res.status(404).send(productAdded.error)
  return res.json(productAdded)
}

const deleteProductFromCartController = (req, res) => {
  const { idCart, idProduct } = req.params
  const productDeleted = carts.deleteProduct(idCart, idProduct)
  if (productDeleted.error) return res.status(404).send(productDeleted.error)
  return res.json(productDeleted)
}

const notFound = (req, res) =>{
  return res.status(404).send(errorNotFound(req.baseUrl, req.path, req.method))
}

module.exports = {
  createCartController,
  deleteCartController,
  listAllProductsByIdCartController,
  addProductToCartController,
  deleteProductFromCartController,
  notFound,
}

