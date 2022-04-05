const Faker = require('../models/faker/productsTest')

const faker = new Faker()

const getRandomGenerator = (req, res, next) => {
  try {
    const products = faker.getData()
    res.json({ success: true, products })
  }
  catch(error) {
    next(error)
  }
}


module.exports = getRandomGenerator