'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('addres', 80).notNullable()
      table.integer('age').notNullable()
      table.string('avatar').notNullable()
      table.string('email', 80).notNullable()
      table.boolean('isAdmin').defaultTo(false)
      table.string('name', 80).notNullable()
      table.string('password', 60).notNullable()
      table.string('phone', 80).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
