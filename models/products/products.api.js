class ProductsApi {
    constructor() {
      this.products = [];
    }
    static idCount = 0;
  
    listAll() {
      return [...this.products]
    }
  
    listByID(id) {
      const product = this.products.find(prod => prod.id === +id)
      return product || { error: `Product with id: ${id} does not exist!` }
    }
      
    save(product) {
      const { title, price, thumbnail } = product
      if (!title || !price || !thumbnail ) return { error: 'Attribute missed.' }
      if (price < 0 || isNaN(price)) return { error: 'Attribute price must be a positive number.' }
      const newProduct = { title, price, thumbnail, id: ++ProductsApi.idCount }
      this.products.push(newProduct)
      return newProduct
    }
  
    update(product, id) {
      const index = this.products.findIndex(prod => prod.id === +id)
      if (index < 0) return { error: `Product with id ${id} not found.` }
      this.products[index] = { id: +id, ...product }
      return this.products[index]
    }
  
    delete(id) {
      const index = this.products.findIndex(prod => prod.id === +id);
      if (index < 0) return { error: `Product with id ${id} not found.` };
      return this.products.splice(index, 1);
    }
  }
  
  module.exports = ProductsApi;