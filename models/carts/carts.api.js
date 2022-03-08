const { v4: uuidv4 } = require('uuid')
const moment = require('moment')


const isCartItemFromClientValid = ({ nombre, descripcion, codigo, foto, precio, stock }) =>{
  if (!nombre || !descripcion || !foto || !precio || !stock || !codigo )
    return false
  return true
}

class CartsApi {
    constructor() {
      this.carts = [];
    }
    /**
     * List all products from a cart. Route: /api/carrito/:id/productos.
     * @param {string} id - The cart's id.
     * @return {array} The products from cart selected.
     */
    listAll(){
      console.log('this.carts:\n', this.carts)
      return this.carts
    }

    /**
     * List all products from a cart. Route: /api/carrito/:id/productos.
     * @param {string} id - The cart's id.
     * @return {array} The products from cart selected.
     */
    listByID(id) {
      const cart = this.carts.find(cart =>  !cart.id.localeCompare(id) )
      console.log('cart selected:\n', cart)
      return cart?.products || { error: `Cart with id: ${id} does not exist!` }
    }
      
     /**
     * Create a cart without products. Route: /api/carrito.
     * @return {string} The cart's id.
     */
    create() {
      const newCart = { id: uuidv4(), timestamp: moment().format("DD-MM-YYYY HH:mm:ss"), products:[]}
      this.carts.push(newCart)
      return newCart.id
    }
    /**
     * Verify if a cart was registered.
     * @param {number} idCart - Cart's id.
     * @return {object} Property "registered" indicates validation's result. Property "location" indicates the index from "Carts"
     */
    indexCartById(idCart) {
      const index = this.carts.findIndex(cart => !cart.id.localeCompare(idCart))
      if (index < 0) return { error: `Cart with id ${idCart} not found.` }
      return index
    }
    /**
     * Add a product to a cart.
     * @param {object[]} productsToAdd - Products to add.
     * @param {number} index - Cart's index to modify.
     * @return {object[]} Array of objects which indicates a succefully operation or an error.
     */
     addProducts( idCart, productsToAdd, products) {
       const indexCart = this.indexCartById(idCart)
       if(indexCart.error) return indexCart
       const result = productsToAdd.map( product => {
         if(!product.id) return { error: `Product's id missed.` }
         if(product.cantidad<=0 || !product.cantidad ) return { error: `Product's quantity missed or invalid.` }
         let productFetched = products.listByID(product.id)
         if(!productFetched.error){
          if(productFetched.stock < product.cantidad) return { error: `Quantity requested are greater than stock.` }
          const prodIndexToUpdate = this.carts[indexCart].products.findIndex(prod => prod.id === productFetched.id)
          console.log('prodIndexToUpdate: ', prodIndexToUpdate)
          let prodToUpdate = this.carts[indexCart].products.splice(prodIndexToUpdate, 1)
          console.log('prodToUpdate: ', prodToUpdate)
          console.log('prodToUpdate.cantidad: ', prodToUpdate.cantidad)
          console.log('product.cantidad: ', product.cantidad)
          prodToUpdate[0]?.cantidad ? prodToUpdate[0].cantidad+=product.cantidad
                                 : prodToUpdate[0] = {...productFetched, cantidad:product.cantidad}
          if(productFetched.stock < prodToUpdate[0].cantidad) return { error: `Quantity requested are greater than stock.Can't update quantity.` }
          delete prodToUpdate[0].stock
          this.carts[indexCart].products.push(prodToUpdate[0])
          productFetched = this.carts[indexCart].products.at(-1)
         } 
         return productFetched
       })
       return result
    }
    /**
     * Delete a cart.
     * @param {number} idCart - Cart's id.
     * @return {object} Return the product deleted.
     */
    deleteCart(idCart) {
      const index = this.carts.findIndex(cart => !cart.id.localeCompare(idCart));
      if (index < 0) return { error: `Cart with id ${idCart} not found.` };
      return this.carts.splice(index, 1);
    }
    /**
     * Delete a product from a specified cart.
     * @param {number} idCart - Cart's id.
     * @param {number} idProduct - Product's id to delete.
     * @return {object[]} Array of objects which indicates a succefully operation or an error.
     */    
    deleteProduct(idCart, idProduct) {
      const indexCart = this.indexCartById(idCart)
      if(indexCart.error) return indexCart
      indexProduct = carts[indexCart].products.findIndex(product => !product.id.localeCompare(idProduct))
      if (indexProduct < 0) return { error: `Product with id ${id} not found.` }
      return this.carts[indexCart].products.splice(indexProduct, 1);
    }
}
  
module.exports = CartsApi;