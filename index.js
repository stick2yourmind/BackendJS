const express = require('express')
const { PORT } = require('./config')
const apiRoutes = require('./routers/index')
const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', apiRoutes)
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
