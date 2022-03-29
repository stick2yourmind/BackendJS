const { CartsDao } = require('../models/daos/index')

const cartsDao = new CartsDao()

const createCart = async (req, res, next) => {
    try {
      const newCart = await cartsDao.create(req.body)
      res.json({ success: true, result: newCart })
    }
    catch(error) {
      next(error)
    }
}

const deleteCartById = async (req, res, next) => {
    const { id } = req.params
    try {
      const deletedCart = await cartsDao.deleteById(id)
      res.json({ success: true, result: deletedCart })
    }
    catch(error) {
      next(error)
    }
}


const getCartById = async (req, res, next) => {
    const { id } = req.params
    console.log('id: ', id)
    try {
      const cart = await cartsDao.getById(id, 'products', '_id nombre descripcion codigo foto precio stock')
      res.json({ success: true, cart })
    }
    catch(error) {
      next(error)
    }
}

const addProductToCart = async (req, res, next) => {
  const { params: { id }, body } = req
  try {
    const updatedCart = await cartsDao.addItemToArray(id, body, 'products')
    res.json({ success: true, result: updatedCart })
  }
  catch(error) {
    next(error)
  }
}

// db.carts.updateOne({}, { $pull: { products:  { codigo: 1 } } } )

const deleteProductFromCart = async (req, res, next) => {
    const { params: { id, idProd } } = req
    try {
      const updatedCart = await cartsDao.removeItemFromArray(id, idProd, 'products')
      res.json({ success: true, result: updatedCart })
    }
    catch(error) {
      next(error)
    }
  }
  


module.exports = {
  createCart,
  deleteCartById,
  getCartById,
  addProductToCart,
  deleteProductFromCart
}