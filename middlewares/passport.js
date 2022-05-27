const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const { SERVICE_EMAIL } = require('../config')
const pug = require('pug')
const path = require('path')
const phoneIsValid = require('../services/messages/phoneValidator')

const transporter = nodemailer.createTransport({
  auth: {
    pass: SERVICE_EMAIL.pass,
    user: SERVICE_EMAIL.user
  },
  port: SERVICE_EMAIL.port,
  service: SERVICE_EMAIL.service
})

const mailOptions = (to, subject, html) => ({
  from: 'Node JS Server',
  html,
  subject,
  to
})

const { UsersDao } = require('../models/daos/index')

const User = new UsersDao()

const salt = () => bcrypt.genSaltSync(10)
const createHash = password => bcrypt.hashSync(password, salt())
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

passport.use('login', new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.getByEmail(username)
    console.log('user (passport.use(login):')
    console.log(user)
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
    const isValid = await phoneIsValid(req.body.phone)
    if (!isValid) {
      const error = { code: 450, message: 'Phone number is not valid', name: 'Error while validating phone number' }
      throw error
    }
    const newUser = {
      address: req.body.address,
      age: req.body.age,
      avatar: req.file.path,
      email: username,
      name: req.body.fullName,
      password: createHash(password),
      phone: req.body.phone
    }
    console.log('newUser:\n', newUser)
    const userSaved = await User.create(newUser)
    console.log('Registration succesfull!')
    const subject = `Nuevo registro de ${newUser.name} - ${newUser.email} `
    const html = pug.renderFile(path.join(__dirname, '../views/newUserEmailNotification.pug'), {})
    transporter.sendMail(mailOptions(SERVICE_EMAIL.user, subject, html))
    console.log('Email notification sent!!')
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
