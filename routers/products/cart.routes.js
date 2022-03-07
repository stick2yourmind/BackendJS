const express = require('express');
const {
  listAllProductsController, 
  listProductByIdController,
  saveProductController, 
  updateProductController,
  deleteProductController
} = require('../../controllers/products.controllers');

const router = express.Router();

router.get('/', listAllProductsController);

router.get('/:idProduct', listProductByIdController);

router.post('/', saveProductController);

router.put('/:idProduct', updateProductController);

router.delete('/:idProduct', deleteProductController);

module.exports = router;