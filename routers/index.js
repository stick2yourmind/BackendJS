const { Router } = require('express')
const productsRoutes = require('./products/products.routes')
const usersRoutes = require('./users/users.routes')
const cartsRoutes = require('./carts/cart.routes')
const errorHandler = require('./handlers/errorHandler')
const notFoundHandler = require('./handlers/notFoundHandler')
const router = Router()

// Routes ./api
router.use('/productos', productsRoutes)
router.use('/usuarios', usersRoutes)
router.use('/order-cart', cartsRoutes)

// Error handler
router.use(errorHandler)

// Not found URL handler
// Every URL not found, appended to /api, will be catch by notFoundHandler
router.all('*', notFoundHandler)

module.exports = router
