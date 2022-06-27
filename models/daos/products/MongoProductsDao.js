const { Schema } = require('mongoose')
const MongoContainer = require('../../containers/MongoContainer')

const productsSchema = new Schema({
  // codigo: { required: true, type: String, unique: true },
  descripcion: { required: true, type: String },
  foto: { required: true, type: String },
  nombre: { required: true, type: String },
  precio: { min: 0, required: true, type: Number },
  stock: { min: 0, required: true, type: Number }
}, { timestamps: true })

class MongoProductsDao extends MongoContainer {
  constructor () {
    super('products', productsSchema)
  }
}

module.exports = MongoProductsDao
