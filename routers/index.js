const { Router } = require('express')
const productsRoutes = require('./products/products.routes')
const cartsRoutes = require('./carts/carts.routes')
const errorHandler = require('./handlers/errorHandler')
const notFoundHandler = require('./handlers/notFoundHandler')
const router = Router()

// Routes
router.use('/productos', productsRoutes)
router.use('/carts', cartsRoutes)

// Error handler
router.use(errorHandler)

// Not found URL handler
// Every URL not found, appended to /api, will be catch by notFoundHandler
router.all('*', notFoundHandler)

module.exports = router