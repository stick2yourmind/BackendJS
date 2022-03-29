const firebaseConfig = require('./db/firebase/firebase.config.json')

module.exports = {
    PORT: process.env.PORT || 8080,
    PERS: process.env.PERS || 'MONGO',
    DB_CONFIG: {
        MONGO:{
            uri: 'mongodb://localhost/ecommerce',
            options: null
        },
        FIREBASE: {
          credential: firebaseConfig,
        }
    }
}