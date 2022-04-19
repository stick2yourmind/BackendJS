const errorHandler = (err, req, res, next) => {
  console.log('----errorHandler----')
  console.log('Error: \n', err.message)
  res.status(422).json({
    error: true,
    message: err.message
  })
}

module.exports = errorHandler
