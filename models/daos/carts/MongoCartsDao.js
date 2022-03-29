const { Schema } = require('mongoose')
const MongoContainer = require('../../containers/MongoContainer')


const cartsSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    products: [{ type: Schema.Types.ObjectId, ref: 'products'}],
})
  
class MongocartsDao extends MongoContainer {
    constructor() {
        super('carts', cartsSchema)
    }
}
 

module.exports = MongocartsDao