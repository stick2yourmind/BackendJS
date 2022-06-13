const ProductDto = require('../dtos/products/products.dto')
const DaosFactory = require('../daos/daos.factory')

class ProductRepo {
  constructor(){
    this.productsDao = DaosFactory.getDaos('products').ProductsDao
  }

  async getAll(){
    try{
      const productsDao = await this.productsDao.getAll()
      return productsDao
    }
    catch(error){
      throw new Error(error)
    }
  }

  async getById(id){
    try{
      const productDao = await this.productsDao.getById(id)
      return productDao
    }
    catch(error){
      throw new Error(error)
    }
  }

  async create(payload){
    try{
      const newProductDto = new ProductDto(payload)
      const newProductDao = await this.productsDao.create(newProductDto)
      return newProductDao
    }
    catch(error){
      throw new Error(error)
    }
  }

  async updateById(id, payload){
    try{
      const updatedProductDto = new ProductDto(payload)
      const updatedProductDao = await this.productsDao.updateById(id, updatedProductDto)
      return updatedProductDao
    }
    catch(error){
      throw new Error(error)
    }
  }

  async deleteProductById(id){
    try{
      const deletedProduct = await this.productsDao.deleteById(id)
      return deletedProduct
    }
    catch(error){
      throw new Error(error)
    }
  }
}

module.exports = ProductRepo