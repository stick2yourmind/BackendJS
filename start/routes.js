'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const ProductsModel = use('App/Models/Product')
Route.on('/').render('welcome')
Route.get('/api/productos', async () => {
  const products = (await ProductsModel.all()).toJSON()
  return products
})

Route.get('/api/productos/:id', async ({params}) => {
  const id = params.id
  const productSelected = (await ProductsModel.find(id)).toJSON()
  return productSelected
})

Route.post('/api/productos',  async (ctx) => {
  const { nombre, descripcion, foto, precio, stock } = ctx.request.body
  const createdProduct = (await ProductsModel.create({ nombre, descripcion, foto, precio, stock })).toJSON()
  return createdProduct
})
Route.put('/api/productos/:id',  async (ctx) => {
  let updatedProduct
  try {
    const { nombre, descripcion, foto, precio, stock } = ctx.request.body
    const id = ctx.params.id
    const currentProduct = await ProductsModel.findOrFail(id)
    currentProduct.nombre = nombre
    currentProduct.descripcion = descripcion
    currentProduct.foto = foto
    currentProduct.precio = precio
    currentProduct.stock = stock
    await currentProduct.save()
    updatedProduct = (await ProductsModel.find(id)).toJSON()
  } catch (error) {
    updatedProduct = error.message
  }
  return updatedProduct
})
Route.delete('/api/productos/:id', async (ctx) => {
  let deletedProduct
  try {
    const id = ctx.params.id
    const currentProduct = await ProductsModel.findOrFail(id)
    deletedProduct = {deleted: await currentProduct.delete()}

  } catch (error) {
    deletedProduct = {deleted: false, details: error.message}
  }
  return deletedProduct
})
