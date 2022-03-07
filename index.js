const express = require('express')
const productRoutes = require('./routers/index')
const http = require('http')
const socketIo = require('socket.io')
const { products } = require('./controllers/products.controllers')

const PORT = process.env.PORT || 8080
const app = express()
const httpServer = http.createServer(app)

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

// API
app.use('/api', productRoutes)
// app.use('/api', cartRoutes)

const time = new Date()
console.log('time: ', time)

const connectedServer = httpServer.listen(PORT, ()=>{
    console.log(`Server is up and running on port ${PORT}`)
})

connectedServer.on('error', (error)=>{
    console.log(`An error has ocurred: ${error}`)
})

