const express = require('express')
const { engine } = require('express-handlebars')
const productRoutes = require('./routers/index')
const http = require('http')
const socketIo = require('socket.io')
const { products } = require('./controllers/products.controllers')
const moment = require('moment')

const PORT = process.env.PORT || 8080
const app = express()
const httpServer = http.createServer(app);
const io = socketIo(httpServer);

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static('./public'));

// Routes
app.use('/', productRoutes)

// Engine template
app.engine('handlebars', engine())
// Setting path where will views be
app.set('views', './views')
// Connecting views with engine templates
app.set('view engine', 'handlebars')

// Renders index.handlebars
app.get('/', function(req, res) {
    console.log(`app.get('/', function(req, res)`)
    res.render('index', {layout: 'main'})
})

const connectedServer = httpServer.listen(PORT, ()=>{
    console.log(`Server is up and running on port ${PORT}`)
})

connectedServer.on('error', (error)=>{
    console.log(`An error has ocurred: ${error}`)
})

let messages = []

io.on('connection', (socket) => {
    console.log('New client connection!')
   
    // Send messages
    socket.emit('products', products.listAll())
  

    socket.on('newProduct', (product) => {
        products.save(product)
        io.emit('newProduct', product)
      })

    socket.on('newMsg', (newMsg) => {
        newMsg = {
            ...newMsg,
            date: moment().format("YYYY-MM-DD HH:mm:ss")
        }
        messages = [...messages, newMsg]
        io.emit('newMsg', newMsg)
      })
  })



