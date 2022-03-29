const { Schema } = require('mongoose');
const MongoContainer = require('../../containers/MongoContainer');

const productsSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  codigo: { type: String, unique: true, required: true },
  foto: { type: String, required: true },
  precio: { type: Number, min: 0, required: true },
  stock: { type: Number, min: 0, required: true }
})

class MongoProductsDao extends MongoContainer {
  constructor() {
    super('products', productsSchema)
  }
}

module.exports = MongoProductsDao
