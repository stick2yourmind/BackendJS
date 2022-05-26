const mongoose = require('mongoose')
const { DB_CONFIG } = require('../../config')

class MongoContainer {
  constructor (collection, schema) {
    this.connect().then(() => console.log('Connecting to MongoDB...'))
    this.Model = mongoose.model(collection, schema)
  }

  async connect () {
    try {
      !DB_CONFIG.MONGO.options
        ? mongoose.connect(DB_CONFIG.MONGO_ATLAS.uri)
        : mongoose.connect(DB_CONFIG.MONGO_ATLAS.uri, DB_CONFIG.MONGO_ATLAS.options)
      mongoose.connection.on('connected', () => console.log('Mongoose connected to MongoDB server!'))
      mongoose.connection.on('error', () => console.log('Mongoose connection could not been established'))
      mongoose.connection.on('disconnected', () => console.log('Mongoose default connection: is not connected'))
    } catch (error) {
      throw new Error(`-MongoDB- Database connection could not been established:\n ${error}`)
    }
  }

  async getAll () {
    const documents = await this.Model.find({}, { __v: 0 }).lean()
    if (Array.isArray(documents) && !documents.length) { throw new Error('-MongoDB- No documents were found!') }
    return documents
  }

  async getById (id, populateColl = null, fields = null) {
    let document = {}
    if (!mongoose.isValidObjectId(id)) { throw new Error(`-MongoDB- ${id} is not a valid ObjectId`) }
    if (populateColl) { document = await this.Model.findOne({ _id: id }, { __v: 0 }).populate(populateColl, fields) } else document = await this.Model.findOne({ _id: id }, { __v: 0 })
    if (!document) { throw new Error(`-MongoDB- Document with id: ${id} could not be found!`) }
    return document
  }

  async getByEmail (userEmail, populateColl = null, fields = null) {
    let document = {}
    if (populateColl) { document = await this.Model.findOne({ email: userEmail }, { __v: 0 }).populate(populateColl, fields) } else document = await this.Model.findOne({ email: userEmail }, { __v: 0 })
    if (!document) { throw new Error(`-MongoDB- Document with user email: ${userEmail} could not be found!`) }
    return document
  }

  async getBy (key, value) {
    let document = {}
    document = await this.Model.find({ [key]: value }, { __v: 0 })
    if (!document) { throw new Error(`-MongoDB- (getBy) Document with key: ${key} and value: ${value} could not be found!`) }
    return document
  }

  async create (payload) {
    const newDocument = new this.Model(payload)
    // If save is successful, the returned promise will fulfill with the document saved.
    const newDocumentSaved = await newDocument.save()
    if (newDocumentSaved === payload) { throw new Error('-MongoDB- New document could not be saved!') }
    return newDocumentSaved
  }

  async updateById (id, payload) {
    if (!mongoose.isValidObjectId(id)) { throw new Error(`-MongoDB- ${id} is not a valid ObjectId`) }
    const updatedDocument = await this.Model.updateOne({ _id: id },
      {
        $set: { ...payload }
      }
    )
    if (!updatedDocument.matchedCount) { throw new Error(`-MongoDB- Document with id: ${id} could not been found!`) }
    return updatedDocument
  }

  async deleteById (id) {
    if (!mongoose.isValidObjectId(id)) { throw new Error(`-MongoDB- ${id} is not a valid ObjectId`) }
    const deletedDocument = await this.Model.deleteOne({ _id: id })
    if (!deletedDocument.deletedCount) { throw new Error(`-MongoDB- Document with id: ${id} could not been found!`) }
    return deletedDocument
  }

  /**
 *
 *
 * @param {*} cartId
 * @param {*} item
 * @param {*} arr
 * @return {*}
 * @memberof MongoContainer
 * Example at mongoDB instruction:
 * db.carts.updateOne(
 * {_id:ObjectId("628ee0e0f8d8f9ca2e533028")},
 * { $push: { products:
 *    {_id: ObjectId("628c3cf921a40c383e3be9b4"), price: 8, quantity: 10} } } )
 *
 *
 * Example of updated document after instruction, with empty array before it:
 * {
    "_id" : ObjectId("628ee0e0f8d8f9ca2e533028"),
    "products" : [
        {
            "_id" : ObjectId("628c3cf921a40c383e3be9b4"),
            "price" : 11049.2,
            "quantity" : 80
        }
    ],
    "createdAt" : ISODate("2022-05-26T02:07:28.965Z"),
    "updatedAt" : ISODate("2022-05-26T02:55:58.737Z"),
    "__v" : 0
}
 */
  async addItemToArray (cartId, item, arr) {
    console.log('item at addItemToArray:')
    console.log(item)
    if (!mongoose.isValidObjectId(cartId)) { throw new Error(`-MongoDB- ${cartId} is not a valid ObjectId`) }
    const updatedDocument = await this.Model.updateOne({ _id: cartId }, { $push: { [arr]: { _id: item._id, price: item.price, quantity: item.quantity } } })
    if (!updatedDocument.matchedCount) { throw new Error(`-MongoDB- Document with id: ${cartId} could not been found!`) }
    return updatedDocument
  }

  // db.carts.updateOne(
  //   {_id:ObjectId("62429e908ef49ab6fbbdcbab")},
  //   { $pull: { products: ObjectId("6242413f2a4fb1bba4528e8d") } }
  // )
  async removeItemFromArray (cartId, itemId, arr) {
    if (!mongoose.isValidObjectId(cartId)) { throw new Error(`-MongoDB- ${cartId} is not a valid ObjectId`) }
    if (!mongoose.isValidObjectId(itemId)) { throw new Error(`-MongoDB- ${itemId} is not a valid ObjectId`) }
    console.log(`cartId, itemId, arr: ${cartId}, ${itemId}, ${arr}`)
    const updatedDocument = await this.Model.updateOne({ _id: cartId }, { $pull: { products: itemId } })
    if (!updatedDocument.matchedCount) { throw new Error(`-MongoDB- Document with id: ${cartId} could not been found!`) }
    return updatedDocument
  }
}

module.exports = MongoContainer
