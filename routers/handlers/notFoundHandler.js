const notFoundHandler = (req, res) => {
  console.log('----notFoundHandler----')
  res.status(404).json({
    error: true,
    message: `Ruta ${req.baseUrl}${req.path} del método ${req.method} no implementada`
  })
}

module.exports = notFoundHandler
