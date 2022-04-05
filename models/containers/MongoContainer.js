const mongoose = require('mongoose')
const { DB_CONFIG } = require('../../config')

class MongoContainer {
  constructor (collection, schema) {
    this.connect().then(() => console.log('Connecting to MongoDB...'))
    this.model = mongoose.model(collection, schema)
  }

  async connect () {
    try {
      !DB_CONFIG.MONGO.options
        ? mongoose.connect(DB_CONFIG.MONGO.uri)
        : mongoose.connect(DB_CONFIG.MONGO.uri, DB_CONFIG.MONGO.options)
      mongoose.connection.on('connected', () => console.log('Mongoose connected to MongoDB server!'))
      mongoose.connection.on('error', () => console.log('Mongoose connection could not been established'))
      mongoose.connection.on('disconnected', () => console.log('Mongoose default connection: is not connected'))
    } catch (error) {
      throw new Error(`-MongoDB- Database connection could not been established:\n ${error}`)
    }
  }

  async getAll () {
    const documents = await this.model.find({}, { __v: 0 }).lean()
    if (Array.isArray(documents) && !documents.length) { throw new Error('-MongoDB- No documents were found!') }
    return documents
  }

  async getById (id, populateColl = null, fields = null) {
    let document = {}
    if (!mongoose.isValidObjectId(id)) { throw new Error(`-MongoDB- ${id} is not a valid ObjectId`) }
    if (populateColl) { document = await this.model.findOne({ _id: id }, { __v: 0 }).populate(populateColl, fields) } else document = await this.model.findOne({ _id: id }, { __v: 0 })
    if (!document) { throw new Error(`-MongoDB- Document with id: ${id} could not be found!`) }
    return document
  }

  async create (payload) {
    const newDocument = new this.model(payload)
    // If save is successful, the returned promise will fulfill with the document saved.
    const newDocumentSaved = await newDocument.save()
    if (newDocumentSaved === payload) { throw new Error('-MongoDB- New document could not be saved!') }
    return newDocumentSaved
  }

  async updateById (id, payload) {
    if (!mongoose.isValidObjectId(id)) { throw new Error(`-MongoDB- ${id} is not a valid ObjectId`) }
    const updatedDocument = await this.model.updateOne({ _id: id },
      {
        $set: { ...payload }
      }
    )
    if (!updatedDocument.matchedCount) { throw new Error(`-MongoDB- Document with id: ${id} could not been found!`) }
    return updatedDocument
  }

  async deleteById (id) {
    if (!mongoose.isValidObjectId(id)) { throw new Error(`-MongoDB- ${id} is not a valid ObjectId`) }
    const deletedDocument = await this.model.deleteOne({ _id: id })
    if (!deletedDocument.deletedCount) { throw new Error(`-MongoDB- Document with id: ${id} could not been found!`) }
    return deletedDocument
  }

  async addItemToArray (cartId, item, arr) {
    if (!mongoose.isValidObjectId(cartId)) { throw new Error(`-MongoDB- ${cartId} is not a valid ObjectId`) }
    const updatedDocument = await this.model.updateOne({ _id: cartId }, { $push: { [arr]: item } })
    if (!updatedDocument.matchedCount) { throw new Error(`-MongoDB- Document with id: ${id} could not been found!`) }
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
    const updatedDocument = await this.model.updateOne({ _id: cartId }, { $pull: { products: itemId } })
    if (!updatedDocument.matchedCount) { throw new Error(`-MongoDB- Document with id: ${id} could not been found!`) }
    return updatedDocument
  }
}

module.exports = MongoContainer
