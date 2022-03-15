const ProductsApi = require('./products.api');
const dbconfig = require('../../db/config')
const Product = new ProductsApi(dbconfig.mariaDB, 'productos')


;(async () => {
    await Product.listAll()
    await Product.save({title:'W77', price: 100, thumbnail: 'img link'})
    await Product.listAll()
    await Product.listByID(9)
    await Product.update({title: 'Camara W77', price: 4600}, 9)
    await Product.delete(9)
})()