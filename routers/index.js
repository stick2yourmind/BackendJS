const express = require('express')

const productRoutes = require('./products/products.routes')
const cartRoutes = require('./carts/carts.routes')

const router = express.Router()

// Routes
router.use('/productos', productRoutes)
router.use('/carrito', cartRoutes)


module.exports = router