const express = require('express');
const {
  createCartController, 
  deleteCartController,
  listAllProductsByIdCartController,
  addProductToCartController,
  notFound
} = require('../../controllers/carts.controllers');

const router = express.Router();

router.post('/', createCartController)
router.delete('/:idCart', deleteCartController)
router.get('/:idCart/productos', listAllProductsByIdCartController)
router.post('/:idCart/productos', addProductToCartController)


// router.get('/', listAllProductsController);

// router.get('/:idProduct', listProductByIdController);


// router.put('/:idProduct', updateProductController);

// router.delete('/:idProduct', deleteProductController);

router.get('*', notFound)
router.post('*', notFound)
router.put('*', notFound)
router.delete('*', notFound)

module.exports = router