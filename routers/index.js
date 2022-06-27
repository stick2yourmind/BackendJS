const { Router } = require('express')
const productsRoutes = require('./products/products.routes')
const usersRoutes = require('./users/users.routes')
const cartsRoutes = require('./carts/cart.routes')
const errorHandler = require('./handlers/errorHandler')
const notFoundHandler = require('./handlers/notFoundHandler')
const router = Router()
const { graphqlHTTP }  = require('express-graphql');
const {schema, getProductById, getAllProducts, createProduct,
  updateProductById, deleteProductById} = require('../controllers/graph.controller')


// Routes ./api
router.use('/productos', productsRoutes)
router.use('/usuarios', usersRoutes)
router.use('/order-cart', cartsRoutes)

router.use('/graphql', graphqlHTTP({
  schema,
  rootValue: {
    getProductById,
    getAllProducts,
    createProduct,
    updateProductById,
    deleteProductById
  },
  graphiql: true
}));

// Error handler
router.use(errorHandler)

// Not found URL handler
// Every URL not found, appended to /api, will be catch by notFoundHandler
router.all('*', notFoundHandler)

module.exports = router


