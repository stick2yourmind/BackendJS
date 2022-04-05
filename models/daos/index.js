const { PERS } = require('../../config')

const persistence = {
    MONGO:{
        products : require('./products/MongoProductsDao'),
        carts : require('./carts/MongoCartsDao')
    }
}

const ProductsDao = persistence[PERS].products
const CartsDao = persistence[PERS].carts

module.exports = {
  ProductsDao,
  CartsDao,
}