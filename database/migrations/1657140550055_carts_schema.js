'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CartsSchema extends Schema {
  up () {
    this.create('carts', (table) => {
      table.increments()
      table.boolean('closed').defaultTo(false)
      table.integer('user_id').notNullable()
      table.integer('product_id').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('carts')
  }
}

module.exports = CartsSchema
