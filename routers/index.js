const { Router } = require('express')
const productsRoutes = require('./products/products.routes')
const usersRoutes = require('./users/users.routes')
const productsTestRoutes = require('./productsTest/productsTest.routes')
const errorHandler = require('./handlers/errorHandler')
const notFoundHandler = require('./handlers/notFoundHandler')
const router = Router()
const { renderRandoms } = require('../controllers/pages.controllers')

router.get('/randoms', renderRandoms)

// Routes
router.use('/productos-test', productsTestRoutes)
router.use('/productos', productsRoutes)
router.use('/usuarios', usersRoutes)

// Error handler
router.use(errorHandler)

// Not found URL handler
// Every URL not found, appended to /api, will be catch by notFoundHandler
router.all('*', notFoundHandler)

module.exports = router
