const { Schema } = require('mongoose')
const MongoContainer = require('../../containers/MongoContainer')

const usersSchema = new Schema({
  address: { required: true, type: String, unique: true },
  age: { required: true, type: String },
  avatar: { required: true, type: String },
  email: { required: true, type: String, unique: true },
  // id: { required: true, type: String, unique: true },
  isAdmin: { default: false, required: false, type: Boolean },
  name: { required: true, type: String },
  password: { required: true, type: String },
  phone: { required: true, type: String, unique: true }
}, { timestamps: true })

class MongoUsersDao extends MongoContainer {
  constructor () {
    super('users', usersSchema)
  }
}

module.exports = MongoUsersDao
