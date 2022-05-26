const { Schema } = require('mongoose')
const MongoContainer = require('../../containers/MongoContainer')

const cartsSchema = new Schema({
  products: [{ _id: { ref: 'products', type: Schema.Types.ObjectId }, price: { default: 0, type: Number }, quantity: { default: 0, type: Number } }],
  user: { ref: 'users', required: true, type: Schema.Types.ObjectId }
}, { timestamps: true })

class MongocartsDao extends MongoContainer {
  constructor () {
    super('carts', cartsSchema)
  }
}

module.exports = MongocartsDao
