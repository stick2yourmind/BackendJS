const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const { UsersDao } = require('../persistence/models/daos/index')

const User = new UsersDao()

const salt = () => bcrypt.genSaltSync(10)
const createHash = password => bcrypt.hashSync(password, salt())
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

passport.use('login', new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.getByEmail(username)
    console.log(`(user.password, password): (${user.password}, ${password})`)
    if (!isValidPassword(user, password)) {
      console.log('Invalid user or password')
      return done(null, false)
    }
    console.log('Login succesfully')
    return done(null, user)
  } catch (error) {
    console.log('error:', error)
    return done(error)
  }
}))

passport.use('register', new LocalStrategy({
  passReqToCallback: true
},
async (req, username, password, done) => {
  try {
    const newUser = {
      alias: req.body.alias,
      apellido: req.body.apellido,
      email: username,
      nombre: req.body.nombre,
      password: createHash(password)
    }
    const userSaved = await User.create(newUser)
    console.log('Registration succesfull!')
    return done(null, userSaved)
  } catch (error) {
    console.log('Error al registrarse', error)
    return done(null, false)
  }
}))

passport.serializeUser((user, done) => {
  console.log('Inside serializer')
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  console.log('Inside deserializer')
  const user = User.getById(id)
  done(null, user)
})

module.exports = passport
