const { buildSchema } = require('graphql');
const ProductsRepo = require('../models/repositories/products.repo')

const ProductsRepository = new ProductsRepo()

 const schema = buildSchema(`
type Product {
  id: ID!,
  descripcion: String,
  foto: String,
  nombre: String,
  precio: Int,
  stock: Int
}

input ProductInput{
  descripcion: String,
  foto: String,
  nombre: String,
  precio: Int,
  stock: Int
}
type ProductDeleteOutput{
  sucess: Boolean
}
type Query {
  getProductById(id: ID!): Product
  getAllProducts : [Product]
}

type Mutation{
  createProduct(payload: ProductInput): Product
  updateProductById(id:ID!, payload: ProductInput) : Product
  deleteProductById(id: ID!) : ProductDeleteOutput
}
`);


 const getAllProducts = async () => {
  const products = await ProductsRepository.getAll()
  return products
}

 const getProductById = async ({id}) => {
  console.log("🚀 ~ file: graph.controller.js ~ line 26 ~ getProductById ~ id", id)
  const product = await ProductsRepository.getById(id)
  return product
}

const createProduct = async ({payload}) => {
  const newProduct = await ProductsRepository.create(payload)
  console.log("🚀 ~ file: graph.controller.js ~ line 39 ~ createProduct ~ newProduct", newProduct)
  return newProduct
}

const updateProductById = async ({id, payload}) => {
  const updatedProduct = await ProductsRepository.updateById(id, payload)
  console.log("🚀 ~ file: graph.controller.js ~ line 55 ~ updateProductById ~ updatedProduct", updatedProduct)
  const product = await ProductsRepository.getById(id)
  return product
}

const deleteProductById = async ({id}) => { 
  const deletedProduct = await ProductsRepository.deleteProductById(id)
  console.log("🚀 ~ file: graph.controller.js ~ line 61 ~ deleteProductById ~ deletedProduct", deletedProduct)
  if(deletedProduct.acknowledged) return {sucess:true}
  return {sucess: false}
}

module.exports = {
  schema,
  getProductById,
  getAllProducts,
  createProduct,
  updateProductById,
  deleteProductById
}