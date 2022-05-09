const { errorLogger } = require('../../utils/logger/config')

const errorHandler = (err, req, res, next) => {
  console.log('----errorHandler----')
  console.log('Error: \n', err.message)
  errorLogger.error(err.message)
  res.status(422).json({
    err: err,
    error: true,
    message: err.message
  })
}

module.exports = errorHandler
