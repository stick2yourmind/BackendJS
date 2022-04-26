require('dotenv').config()
module.exports = {
  DB_CONFIG: {
    MONGO: {
      options: null,
      uri: process.env.MONGO_URI || 'mongodb://localhost/ecommerce'
    },
    MONGO_ATLAS: {
      options: null,
      uri: process.env.MONGO_ATLAS_URI || 'mongodb+srv://anker:tiXCScG6jgbKTXoP@coderhouse-ecommerce.mxktd.mongodb.net/sesiones?retryWrites=true&w=majority'
    }
  },
  PASSPORT_SECRET: process.env.PASSPORT_SECRET || 'palabra-secreta',
  PERS: process.env.PERS || 'MONGO',
  PORT: process.env.PORT || 8080
}
