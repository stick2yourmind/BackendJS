const MongoProductsDao = require('./products/MongoProductsDao')
const MongoUsersDao = require('./users/MongoUsersDao')
const MongoMessagesDao = require('./messages/MongoMessagesDao')
const MongoCartsDao = require('./carts/MongoCartsDao')

class DaosFactory {
  static getDaos (type) {
    let ProductsDao
    let UsersDao
    let MessagesDao
    let CartsDao
    switch (type.toLowerCase()) {
      case 'products':
        ProductsDao = new MongoProductsDao()
        break
      case 'users':
        UsersDao = new MongoUsersDao()
        break
      case 'messages':
        MessagesDao = new MongoMessagesDao()
        break
      case 'carts':
        CartsDao = new MongoCartsDao()
        break
      default:
        throw new Error('Invalid data source, please provide one of the following (products | users)')
    }
    return {
      CartsDao,
      MessagesDao,
      ProductsDao,
      UsersDao
    }
  }
}

module.exports = DaosFactory
