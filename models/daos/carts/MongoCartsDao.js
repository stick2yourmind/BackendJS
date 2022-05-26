const { Schema } = require('mongoose')
const MongoContainer = require('../../containers/MongoContainer')

const cartsSchema = new Schema({
  products: [{ price: { default: 0, type: Number }, quantity: { default: 0, type: Number }, ref: 'products', type: Schema.Types.ObjectId }],
  user: { ref: 'users', type: Schema.Types.ObjectId }
}, { timestamps: true })

class MongocartsDao extends MongoContainer {
  constructor () {
    super('carts', cartsSchema)
  }
}

module.exports = MongocartsDao
