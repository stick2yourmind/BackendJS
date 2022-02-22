const { ProductsApi } = require('../models/index');

const products = new ProductsApi();

const listAllProductsController = (req, res) => {
  let allProducts = products.listAll()
  return res.render('productos', { showProducts: allProducts.length, products: allProducts })
}


const listProductByIdController = (req, res) => {
  const { idProduct } = req.params   
  const productById = products.listByID(idProduct)
  if (productById.error) return res.status(404).send(productById.error)
  return res.json(productById)
}

const saveProductController = (req, res) => {
  const newProduct = products.save(req.body)
  if (newProduct.error) return res.status(400).send(newProduct.error)
  return res.render('index', {layout: 'main'})
}

const updateProductController = (req, res) => {
  const { idProduct } = req.params
  const productUpdated = products.update(req.body, idProduct)
  if (productUpdated.error) return res.status(404).send(productUpdated.error)
  return res.json(productUpdated)
}

const deleteProductController = (req, res) => {
  const { idProduct } = req.params
  const productDeleted = products.delete(idProduct)
  if (productDeleted.error) return res.status(404).send(productDeleted.error)
  return res.json(productDeleted)
}

module.exports = {
  listAllProductsController,
  listProductByIdController,
  saveProductController,
  updateProductController,
  deleteProductController,
}