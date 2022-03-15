const dbconfig = require('../config')
const knex = require('knex')(dbconfig.mariaDB);

(async () => {
    try{
        const tableExists = await knex.schema.hasTable('productos')
        if(tableExists){
            const products = await knex.from('productos').select('*')
            console.table(products)
        }
        else
            console.log('Table do not exists.Instruction aborted.')

    }
    catch(error){
        console.log(error)
        throw error
    }
    finally{
        knex.destroy()
    }
})()