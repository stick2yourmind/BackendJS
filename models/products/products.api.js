class contenedorDB {
    constructor(knexConfig, tableName) {
      this.knexConfig = knexConfig
      this.tableName = tableName
    }
    /**
     * List all registers or documents.
     * @returns {Array} All registers or documents.
     */
    async listAll() {
      let registers = null
      const knex = require('knex')(this.knexConfig);
      try{
        const tableExists = await knex.schema.hasTable(this.tableName)
        if(tableExists){
            registers = await knex.from(this.tableName).select('*')
            if(!registers.length) registers = {error: `Registers or documents could not be searched.`}
            //else registers = {...registers[0]}
        }
        else registers = { error: 'Table do not exists.Instruction aborted.' }
      }
      catch(error){
        registers = {error}
      }
      finally{
          knex.destroy()
          return registers
      }
    }
    /**
     * List a register or document searched by its id.
     * @param {number|string} id - id from register or document to search.
     * @returns {Object} Returns the register or document searched, but error.
     */
    async listByID(id) { 
      let register = null
      const knex = require('knex')(this.knexConfig);
      try{
        const tableExists = await knex.schema.hasTable(this.tableName)
        if(tableExists){
            register = await knex(this.tableName).select('*').where('id', id)
            if(!register.length) register = {error: `Register or document with id: ${id} not found.`}
            else register = {...register[0]}
        }
        else register = { error: 'Table do not exists.Instruction aborted.' }
      }
      catch(error){
        register = {error}
      }
      finally{
          knex.destroy()
          return register
      }
    }
    /**
     * Saves a new register or document.
     * @param {Object} newRegister - New register or document to save.
     * @returns {Object} Returns the register or document saved if it was succesfull, but error.
     */
    async save(newRegister) {
      let registerSaved = null
      const knex = require('knex')(this.knexConfig)
      try{
        const tableExists = await knex.schema.hasTable(this.tableName)
        if(tableExists){
            const idFromRegisterSaved = await knex(this.tableName).insert(newRegister)
            if(!idFromRegisterSaved) registerSaved = {error: `Register or document could not be saved.`}
            else{
              registerSaved = await knex(this.tableName).where('id', idFromRegisterSaved)
              registerSaved = {...registerSaved[0]}
            } 
        }
        else registerSaved = { error: 'Table do not exists.Instruction aborted.' }

      }
      catch(error){
        registerSaved = {error}
      }
      finally{
          knex.destroy()
          return registerSaved
      }
    }
    /**
     * Updates a register by using its id.
     * @param {Object} newRegister - New register or document tobe updated .
     * @param {number|string} id - id from register or document to update.
     * @returns {Object} Returns the register or document updated if it was succesfull, but error.
     */
    async update(newRegister, id) {
      let registerUpdated = null
      const knex = require('knex')(this.knexConfig)
      try{
        const tableExists = await knex.schema.hasTable(this.tableName)
        if(tableExists){
            registerUpdated = await knex(this.tableName).where('id', id).update(newRegister)
            if(!registerUpdated) registerUpdated = {error: `Register or document with id: ${id} not found.`}
            else{
              registerUpdated = await knex(this.tableName).where('id', id)
              registerUpdated = {...registerUpdated[0]}
            }
        }
        else registerUpdated = { error: 'Table do not exists.Instruction aborted.' }
      }
      catch(error){
          registerUpdated = {error}
      }
      finally{
          knex.destroy()
          return registerUpdated
      }
    }
    /**
     * Delete element by its id.
     * @param {number|string} id - Register's id to delete from DB.
     * @returns {Object} - Returns an object which cointains element deleted or error.
     */
    async delete(id) {
      let register = null
      const knex = require('knex')(this.knexConfig);
      try{
        const tableExists = await knex.schema.hasTable(this.tableName)
        if(tableExists){
            const aux = await knex.from(this.tableName).where('id', id)
            register = await knex.from(this.tableName).where('id', id).del()
            if(!register) register = {error: `Register or document with id: ${id} not found.`}
            else register = {...aux[0]}
        }
        else register = {error: `Table do not exists.Instruction aborted.`}
      }
      catch(error){
        register = {error}
      }
      finally{
          knex.destroy()
          return register 
      }
    }
  }
  
  module.exports = contenedorDB;