const { PERS } = require('../../config')

const persistence = {
  MONGO: {
    messages: require('./messages/MongoMessagesDao'),
    products: require('./products/MongoProductsDao'),
    users: require('./users/MongoUsersDao')
  }
}

const UsersDao = persistence[PERS].users
const CartsDao = persistence[PERS].carts
const ProductsDao = persistence[PERS].products

module.exports = {
  CartsDao,
  ProductsDao,
  UsersDao
}
