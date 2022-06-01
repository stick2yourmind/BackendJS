const { ProductsDao } = require('../persistence/models/daos/index')

const productsDao = new ProductsDao()

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productsDao.getAll()
    res.json({ products, success: true })
  } catch (error) {
    next(error)
  }
}

const getProductById = async (req, res, next) => {
  const { id } = req.params
  try {
    const product = await productsDao.getById(id)
    res.json({ product, success: true })
  } catch (error) {
    next(error)
  }
}

const createProduct = async (req, res, next) => {
  try {
    const newProduct = await productsDao.create(req.body)
    res.json({ result: newProduct, success: true })
  } catch (error) {
    next(error)
  }
}

const updateProductById = async (req, res, next) => {
  const { params: { id }, body } = req
  try {
    const updatedProduct = await productsDao.updateById(id, body)
    res.json({ result: updatedProduct, success: true })
  } catch (error) {
    next(error)
  }
}

const deleteProductById = async (req, res, next) => {
  const { id } = req.params
  try {
    const deletedProduct = await productsDao.deleteById(id)
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
