const express = require('express');
const {
  listAllProductsController, 
  listProductByIdController,
  saveProductController, 
  updateProductController,
  deleteProductController,
  getNotFound,
  postNotFound,
  putNotFound,
  deleteNotFound
} = require('../../controllers/products.controllers');

const router = express.Router();

router.get('/', listAllProductsController);

router.get('/:idProduct', listProductByIdController);

router.post('/', saveProductController);

router.put('/:idProduct', updateProductController);

router.delete('/:idProduct', deleteProductController);

router.get('*', getNotFound);
router.post('*', postNotFound);
router.put('*', putNotFound);
router.delete('*', deleteNotFound);

module.exports = router;