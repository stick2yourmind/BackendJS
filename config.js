module.exports = {
  DB_CONFIG: {
    MONGO: {
      options: null,
      uri: 'mongodb://localhost/ecommerce'
    }
  },
  PERS: process.env.PERS || 'MONGO',
  PORT: process.env.PORT || 8080
}
