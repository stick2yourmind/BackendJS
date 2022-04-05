const { Schema } = require('mongoose')
const MongoContainer = require('../../containers/MongoContainer')

const authorsSchema = new Schema({
  alias: { required: true, type: String, unique: true },
  apellido: { required: true, type: String },
  avatar: { required: true, type: String },
  edad: { required: true, type: String },
  id: { required: true, type: String, unique: true },
  nombre: { required: true, type: String }
}, { timestamps: true })

class MongoAuthorsDao extends MongoContainer {
  constructor () {
    super('authors', authorsSchema)
  }
}

module.exports = MongoAuthorsDao
