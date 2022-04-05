const Faker = require('../models/faker/productsTest')

const faker = new Faker()

const getRandomGenerator = (req, res, next) => {
  try {
    const products = faker.getData()
    res.json({ products, success: true })
  } catch (error) {
    next(error)
  }
}

module.exports = getRandomGenerator
