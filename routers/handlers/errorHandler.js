const errorHandler = (err, req, res, next) => {
    console.log("----errorHandler----")
    res.status(422).json({
      error: true,
      message: err.message
    })
}
  
module.exports = errorHandler