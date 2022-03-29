const admin = require('firebase-admin')
const { getFirestore } = require('firebase-admin/firestore')
const { DB_CONFIG } = require('../../config')

class FirebaseContainer {
  constructor(collection) {
    this.connect()
    const db = getFirestore()
    this.query = db.collection(collection)
  }

  connect() {
    admin.initializeApp({
      credential: admin.credential.cert(DB_CONFIG.firebase.credential)
    })
    console.log('Connected to Firestore!')
  }

  async getAll() {
    try{
        const docRef = await this.query.get()
        if (docRef.empty)
            throw new Error(`-Firebase- No documents were found!`)
        const documents = docRef.docs
        return documents.map(document => ({ 
        id: document.id,
        ...document.data()
        }))
    }
    catch(error){throw new Error(`-Firebase- ${error}`)}        
  }

  async getById(id) {
    try{
        const docRef = this.query.doc(id)
        const document = await docRef.get()
        if (!document.exists)
          throw new Error(`-Firebase- No document with id: ${id} was found!`)
        return document.data()
    }
    catch(error){throw new Error(`-Firebase- ${error}`)}    
  }

  async create(payload) {
    try{
        const res = await this.query.add(payload)
        if(!res.id)
            throw new Error(`-Firebase- Document could not be created!`)
        return res
    }
    catch(error){throw new Error(`-Firebase- ${error}`)}    
  }

  async updateById(id, payload) {
    try{
        const docRef = this.query.doc(id)
        if (!docRef)
            throw new Error(`-Firebase- Document with id: ${id} could not be found!`)
        return await docRef.update(payload)
    }
    catch(error){throw new Error(`-Firebase- ${error}`)} 
  }

  async deleteById(id) {
    try{
        const docRef = this.query.doc(id)
        if (!docRef)
            throw new Error(`-Firebase- Document with id: ${id} could not be found!`)
        return await docRef.delete()
    }
    catch(error){throw new Error(`-Firebase- ${error}`)} 
  }
}

module.exports = FirebaseContainer