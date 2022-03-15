const dbconfig = require('../config')
const knex = require('knex')(dbconfig.mariaDB);

(async () => {
    try{
        const tableExists = await knex.schema.hasTable('productos')
        if(!tableExists){
            await knex.schema.createTable('productos', (table) => {
                table.increments('id')
                table.string('title').notNullable()
                table.integer('price').notNullable()
                table.string('thumbnail').notNullable()
            })
            console.log('Table created')
        }
        else
            console.log('Table already exists, table creation has been aborted.')

    }
    catch(error){
        console.log(error)
        throw error
    }
    finally{
        knex.destroy()
    }
})()