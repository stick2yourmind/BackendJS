const { Router } = require('express')
const errorHandler = require('./handlers/errorHandler')
const notFoundHandler = require('./handlers/notFoundHandler')
const pagesRoutes = require('./pages/pages.routes')
const router = Router()

// Routes
router.use('/', pagesRoutes)

// Error handler
router.use(errorHandler)

// Not found URL handler
// Every URL not found, appended to /api, will be catch by notFoundHandler
router.all('*', notFoundHandler)

module.exports = router
