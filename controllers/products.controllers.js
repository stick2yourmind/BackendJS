const ProductsRepo = require('../models/repositories/products.repo')

const ProductsRepository = new ProductsRepo()

const getAllProducts = async (req, res, next) => {
  try {
    const products = await ProductsRepository.getAll()
    res.json({ products, success: true })
  } catch (error) {
    next(error)
  }
}

const getProductById = async (req, res, next) => {
  const { id } = req.params
  try {
    const product = await ProductsRepository.getById(id)
    res.json({ product, success: true })
  } catch (error) {
    next(error)
  }
}

const createProduct = async (req, res, next) => {
  try {
    const newProduct = await ProductsRepository.create(req.body)
    res.json({ result: newProduct, success: true })
  } catch (error) {
    next(error)
  }
}

const updateProductById = async (req, res, next) => {
  const { params: { id }, body } = req
  try {
    const updatedProduct = await ProductsRepository.updateById(id, body)
    res.json({ result: updatedProduct, success: true })
  } catch (error) {
    next(error)
  }
}

const deleteProductById = async (req, res, next) => {
  const { id } = req.params
  try {
    const deletedProduct = await ProductsRepository.deleteById(id)
    res.json({ result: deletedProduct, success: true })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById
}
