const { v4: uuidv4 } = require('uuid')
const moment = require('moment')

const isProductFromClientValid = ({ nombre, descripcion, codigo, foto, precio, stock }) =>{
  if (!nombre || !descripcion || !foto || !precio || !stock || !codigo )
    return false
  return true
}

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
      const product = this.products.find(prod =>  !prod.id.localeCompare(id) )
      return product || { error: `Product with id: ${id} does not exist!` }
    }
      
    save(product) {
      const { nombre, descripcion, codigo, foto, precio, stock } = product
      if ( !isProductFromClientValid(product) ) return { error: 'Attribute missed.' }
      if (precio < 0 || isNaN(precio)) return { error: 'Attribute price must be a positive number.' }
      const newProduct = { id: uuidv4(), timestamp: moment().format("DD-MM-YYYY HH:mm:ss"), 
        nombre, descripcion, codigo, foto, precio, stock }
      this.products.push(newProduct)
      return newProduct
    }
  
    update(product, id) {
      // Destructing to avoid overwrite id and timestamp 
      const { nombre, descripcion, codigo, foto, precio, stock } = product
      const index = this.products.findIndex(prod => !prod.id.localeCompare(id))
      if (index < 0) return { error: `Product with id ${id} not found.` }
      if ( !isProductFromClientValid(product) ) return { error: 'Attribute missed.' }
      this.products[index] = {  nombre, descripcion, codigo, foto, precio, stock, 
        id: this.products[index].id,
        timestamp: this.products[index].timestamp
      }
      return this.products[index]
    }
  
    delete(id) {
      const index = this.products.findIndex(prod => !prod.id.localeCompare(id));
      if (index < 0) return { error: `Product with id ${id} not found.` };
      return this.products.splice(index, 1);
    }
  }
  
  module.exports = ProductsApi;