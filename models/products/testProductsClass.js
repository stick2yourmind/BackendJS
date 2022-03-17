const ProductsApi = require('./products.api');
const dbconfig = require('../../db/config')
const Product = new ProductsApi(dbconfig.mariaDB, 'productos')


;(async () => {
    console.table(await Product.listAll())
    console.log('save: \n',await Product.save({title:'W77', price: 100, thumbnail: 'img link'}))
    console.table(await Product.listAll())
    console.log('listByID: \n',await Product.listByID(82))
    console.log('update: \n',await Product.update({title: 'Camara W77', price: 4600}, 82))
    console.log('delete: \n',await Product.delete(82))
})()