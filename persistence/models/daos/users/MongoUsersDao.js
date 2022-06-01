const { Schema } = require('mongoose')
const MongoContainer = require('../../containers/MongoContainer')

const usersSchema = new Schema({
  // _id: { required: false, type: Schema.Types.ObjectId },
  alias: { required: true, type: String, unique: true },
  apellido: { required: true, type: String },
  avatar: { required: false, type: String },
  edad: { required: false, type: String },

  email: { required: true, type: String, unique: true },
  // id: { required: true, type: String, unique: true },
  isAdmin: { default: false, required: false, type: Boolean },
  nombre: { required: true, type: String },
  password: { required: true, type: String }
}, { timestamps: true })

class MongoUsersDao extends MongoContainer {
  constructor () {
    super('users', usersSchema)
  }
}

module.exports = MongoUsersDao
