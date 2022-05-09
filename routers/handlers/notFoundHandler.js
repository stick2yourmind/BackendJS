const { warnLogger } = require('../../utils/logger/config')
const notFoundHandler = (req, res) => {
  console.log('----notFoundHandler----')
  warnLogger.warn(`Ruta ${req.baseUrl}${req.path} del método ${req.method} no implementada`)
  res.status(404).json({
    error: true,
    message: `Ruta ${req.baseUrl}${req.path} del método ${req.method} no implementada`
  })
}

module.exports = notFoundHandler
