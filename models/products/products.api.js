class ProductsApi {
    constructor(knexConfig, tableName) {
      // this.products = [];
      this.knexConfig = knexConfig
      this.tableName = tableName
    }
    // static idCount = 0;
  
    async listAll() {
      // return [...this.products]
      const knex = require('knex')(this.knexConfig);
      try{
        const tableExists = await knex.schema.hasTable(this.tableName)
        if(tableExists){
            const products = await knex.from(this.tableName).select('*')
            console.log('---------- Table from: listAll ----------')
            console.table(products)
        }
        else
            console.log('Table do not exists.Instruction aborted.')

      }
      catch(error){
          console.log(error)
          throw error
      }
      finally{
          knex.destroy()
      }
    }
  
    async listByID(id) {
      // const product = this.products.find(prod => prod.id === +id)
      let product = null
      const knex = require('knex')(this.knexConfig);
      try{
        const tableExists = await knex.schema.hasTable(this.tableName)
        if(tableExists){
            product = await knex.from(this.tableName).select('*')
            .where('id', id)
            console.log('---------- Table from: listByID ----------')
            console.table(product)
        }
        else{
          console.log('Table do not exists.Instruction aborted.')

        }
            

      }
      catch(error){
          console.log(error)
          throw error
      }
      finally{
          knex.destroy()
      }
      return product || { error: `Product with id: ${id} does not exist!` }
    }
      
    async save(product) {
      const { title, price, thumbnail } = product
      if (!title || !price || !thumbnail ) return { error: 'Attribute missed.' }
      if (price < 0 || isNaN(price)) return { error: 'Attribute price must be a positive number.' }
      // const newProduct = { title, price, thumbnail, id: ++ProductsApi.idCount }
      // this.products.push(newProduct)
      const newProduct = { title, price, thumbnail }
      const knex = require('knex')(this.knexConfig)
      try{
        const tableExists = await knex.schema.hasTable(this.tableName)
        if(tableExists){
            const products = await knex(this.tableName).insert(newProduct)
            console.log('---------- Table from: save ----------')
            console.table(products)
            return newProduct
        }
        else{
          console.log('Table do not exists.Instruction aborted.')
          return { error: 'Table do not exists.Instruction aborted.' }
        }

      }
      catch(error){
          console.log(error)
          throw error
      }
      finally{
          knex.destroy()
      }
    }
  
    async update(product, id) {
      // const index = this.products.findIndex(prod => prod.id === +id)
      const knex = require('knex')(this.knexConfig)
      let productUpdated = null
      const { title, price, thumbnail } = product
      if (!(title || price || thumbnail )) return { error: 'Attribute missed.' }
      try{
        const tableExists = await knex.schema.hasTable(this.tableName)
        if(tableExists){
            productUpdated = await knex(this.tableName).where('id', id).update(product)
            console.log('---------- Table from: update ----------')
            if(productUpdated)
            productUpdated = await knex(this.tableName).where('id', id)
            console.table(productUpdated)
        }
        else{
          console.log('---------- Table from: update else ----------')
          console.log('Table do not exists.Instruction aborted.')
          return { error: 'Table do not exists.Instruction aborted.' }
        }

      }
      catch(error){
          console.log('---------- Table from: update catch ----------')
          console.log(error)
          throw error
      }
      finally{
          console.log('---------- Table from: update finally ----------')
          knex.destroy()
          return productUpdated
      }
    }
  
    async delete(id) {
      let product = null
      const knex = require('knex')(this.knexConfig);
      try{
        const tableExists = await knex.schema.hasTable(this.tableName)
        if(tableExists){
            product = await knex.from(this.tableName).where('id', id).del()
            console.log('---------- Table from: delete ----------')
            console.table(product)
        }
        else{
          console.log('Table do not exists.Instruction aborted.')

        }
            

      }
      catch(error){
          console.log(error)
          throw error
      }
      finally{
          knex.destroy()
          return product || { error: `Product with id: ${id} does not exist!` }
      }
    }
  }
  
  module.exports = ProductsApi;