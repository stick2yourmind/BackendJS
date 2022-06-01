const { faker } = require('@faker-js/faker')

faker.setLocale('es_MX')

class Faker {
  constructor () {
    this.data = []
  }

  getData (quantity = 5) {
    for (let i = 0; i < quantity; i++) {
      this.data.push({
        randomImg: faker.image.food(),
        randomName: faker.commerce.product(),
        randomPrice: faker.commerce.price(100, 200, 0.01, '$')
      })
    }
    return this.data
  }
}

module.exports = Faker
