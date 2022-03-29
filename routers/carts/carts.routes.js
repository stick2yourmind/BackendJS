const { Router } = require('express')
const {
  createCart,
  deleteCart,
  getCartById,
  addProductToCart,
  deleteProductFromCart
} = require('../../controllers/carts.controllers')


const router = Router()

router.post('/', createCart)

router.delete('/:id', deleteCart)

router.get('/:id/productos', getCartById)

router.post('/:id/productos', addProductToCart)

router.delete('/:id/productos/:id_prod', deleteProductFromCart)

module.exports = router