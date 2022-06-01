const { Schema } = require('mongoose')
const MongoContainer = require('../../containers/MongoContainer')

const messagesSchema = new Schema({
  author: [{ ref: 'authors', type: Schema.Types.ObjectId }],
  text: String
}, { timestamps: true })

class MongoMessagesDao extends MongoContainer {
  constructor () {
    super('messages', messagesSchema)
  }
}

module.exports = MongoMessagesDao
