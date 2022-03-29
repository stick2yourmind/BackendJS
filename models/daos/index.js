const { PERS } = require('../../config')

const persistence = {
    FIREBASE: {
        products: require('./products/FirebaseProductsDao'),
        carts : require('./carts/FirebaseCartsDao')
    },
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