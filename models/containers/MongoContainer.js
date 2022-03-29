const mongoose = require('mongoose')
const { DB_CONFIG } = require('../../config')

class MongoContainer {
  constructor(collection, schema) {
    this.connect().then(() => console.log('MongoDB database connected!'))
    this.model = mongoose.model(collection, schema)
  }

  async connect() {
      try{
        !DB_CONFIG.MONGO.options 
                ? mongoose.connect( DB_CONFIG.MONGO.uri )
                : mongoose.connect( DB_CONFIG.MONGO.uri, DB_CONFIG.MONGO.options )
        mongoose.connection.on( 'disconnected', ()=> console.log("Mongoose default connection was disconnected") )
      }
      catch(error){
          throw new Error(`-MongoDB- Database connection could not been established:\n ${error}`)
      }
  }

  async getAll() {
    const documents = await this.model.find({}, {__v: 0}).lean()
    if(Array.isArray(documents) && !documents.length)
      throw new Error(`-MongoDB- No documents were found!`)
    return documents
  }

  async getById(id) {
    if(!mongoose.isValidObjectId(id))
      throw new Error(`-MongoDB- ${id} is not a valid ObjectId`)
    const document = await this.model.findOne({ _id: id }, {__v: 0})
    if (!document) 
      throw new Error(`-MongoDB- Document with id: ${id} could not be found!`)
    return document
  }

  async create(payload) {
    const newDocument = new this.model(payload)
    // If save is successful, the returned promise will fulfill with the document saved.
    const newDocumentSaved = await newDocument.save()
    if(newDocumentSaved === payload)
        throw new Error(`-MongoDB- New document could not be saved!`)
    return newDocumentSaved
  }

  async updateById(id, payload) {
    if(!mongoose.isValidObjectId(id))
      throw new Error(`-MongoDB- ${id} is not a valid ObjectId`)
    const updatedDocument = await this.model.updateOne({ _id: id }, 
      { 
        $set: { ...payload } 
      }
    )
    if (!updatedDocument.matchedCount)
      throw new Error(`-MongoDB- Document with id: ${id} could not been found!`)
    return updatedDocument
  }

  async deleteById(id) {
    if(!mongoose.isValidObjectId(id))
      throw new Error(`-MongoDB- ${id} is not a valid ObjectId`)
    const deletedDocument = await this.model.deleteOne({ _id: id })
    if(!deletedDocument.deletedCount)
        throw new Error(`-MongoDB- Document with id: ${id} could not been found!`)
    return deletedDocument
  }

  async addItemToArray(item, idParent){
    if(!mongoose.isValidObjectId(idParent))
      throw new Error(`-MongoDB- ${idParent} is not a valid ObjectId`)
    const updatedDocument = await this.model.updateOne({ _id:idParent }, { $push: { products: item } })
    if (!updatedDocument.matchedCount)
      throw new Error(`-MongoDB- Document with id: ${id} could not been found!`)
    return updatedDocument
  }
}

module.exports = MongoContainer