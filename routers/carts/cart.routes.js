const { Router } = require('express')
const {
  createCart,
  deleteCartById,
  closeCartById,
  getCartById,
  addProductToCart,
  deleteProductFromCart,
  getUserCarts
} = require('../../controllers/carts.controllers')

const router = Router()

// Routes at <HOST>:<PORT>/api/order-cart
router.get('/', getUserCarts)

router.post('/', createCart)

router.delete('/:id', deleteCartById)

router.post('/:cartId', closeCartById)

router.get('/:id/productos', getCartById)

router.post('/:cartId/productos', addProductToCart)

router.delete('/:id/productos/:idProd', deleteProductFromCart)

module.exports = router
