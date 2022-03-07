const { v4: uuidv4 } = require('uuid')
const moment = require('moment')

class ProductsApi {
    constructor() {
      this.products = [];
    }
  
    listAll() {
      const allProducts = [...this.products]
      if(!allProducts.length) return { error: `There are no products registered.` }
      return allProducts
    }
  
    listByID(id) {
      console.log('id: ', id)
      console.log('typeOf: ', typeof(id))
      const product = this.products.find(prod => {
        console.log('String.toString(prod.id): ', String.toString(prod.id))
        if(String.toString(prod.id) == id)
          return true
      })
      return product || { error: `Product with id: ${id} does not exist!` }
    }
      
    save(product) {
      const { nombre, descripcion, foto, precio, stock } = product
      if (!nombre || !descripcion || !foto || !precio || !stock ) return { error: 'Attribute missed.' }
      if (precio < 0 || isNaN(precio)) return { error: 'Attribute price must be a positive number.' }
      const newProduct = { id: uuidv4(), timestamp: moment().format("DD-MM-YYYY HH:mm:ss"), codigo: uuidv4(),
        nombre, descripcion, foto, precio, stock }
      this.products.push(newProduct)
      return newProduct
    }
  
    update(product, id) {
      const index = this.products.findIndex(prod => prod.id === +id)
      if (index < 0) return { error: `Product with id ${id} not found.` }
      this.products[index] = {  ...product, id: +id }
      return this.products[index]
    }
  
    delete(id) {
      const index = this.products.findIndex(prod => prod.id === +id);
      if (index < 0) return { error: `Product with id ${id} not found.` };
      return this.products.splice(index, 1);
    }
  }
  
  module.exports = ProductsApi;