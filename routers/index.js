const { Router } = require('express')
const productsRoutes = require('./products/products.routes')
const authorsRoutes = require('./authors/authors.routes')
const productsTestRoutes = require('./productsTest/productsTest.routes')
const errorHandler = require('./handlers/errorHandler')
const notFoundHandler = require('./handlers/notFoundHandler')
const router = Router()

// Routes
router.use('/productos-test', productsTestRoutes)
router.use('/productos', productsRoutes)
router.use('/autores', authorsRoutes)

// Error handler
router.use(errorHandler)

// Not found URL handler
// Every URL not found, appended to /api, will be catch by notFoundHandler
router.all('*', notFoundHandler)

module.exports = router
