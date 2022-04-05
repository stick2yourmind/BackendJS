const { PERS } = require('../../config')

const persistence = {
  MONGO: {
    authors: require('./authors/MongoAuthorsDao'),
    messages: require('./messages/MongoMessagesDao'),
    products: require('./products/MongoProductsDao')
  }
}

const AuthorsDao = persistence[PERS].authors
const CartsDao = persistence[PERS].carts
const ProductsDao = persistence[PERS].products

module.exports = {
  AuthorsDao,
  CartsDao,
  ProductsDao
}
