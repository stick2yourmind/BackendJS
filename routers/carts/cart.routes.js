const { Router } = require('express')
const {
  createCart,
  deleteCartById,
  getCartById,
  addProductToCart,
  deleteProductFromCart
} = require('../../controllers/carts.controllers')

const router = Router()

router.post('/', createCart)

router.delete('/:id', deleteCartById)

router.get('/:id/productos', getCartById)

router.post('/:cartId/productos', addProductToCart)

router.delete('/:id/productos/:idProd', deleteProductFromCart)

module.exports = router
