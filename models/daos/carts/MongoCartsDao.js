const { Schema } = require('mongoose')
const MongoContainer = require('../../containers/MongoContainer')

const cartsSchema = new Schema({
  closed: { default: false, type: Boolean },
  products: [{ _id: { ref: 'products', type: Schema.Types.ObjectId }, price: { type: Number }, quantity: { default: 0, type: Number } }],
  user: { ref: 'users', required: true, type: Schema.Types.ObjectId }
}, { timestamps: true })

class MongocartsDao extends MongoContainer {
  constructor () {
    super('carts', cartsSchema)
  }
}

module.exports = MongocartsDao
