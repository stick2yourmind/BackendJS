const express = require('express')
const { engine } = require('express-handlebars')
const productRoutes = require('./routers/index')
const http = require('http')
const socketIo = require('socket.io')
const { products } = require('./controllers/products.controllers')

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

// // Renders public/index.html
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, '/index.html'));
// })



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

// const products = [
//     {
//         title: "Camara W77" ,
//         price: 3100 ,
//         thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_819534-MLA45978729622_052021-F.webp" ,
//         id: 1
//     },
//     {
//         title: "Sarten 24cm Tefal Intuition Induccion T-fal Antiadherente" ,
//         price: 5500 ,
//         thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_962976-MLA45727843518_042021-F.webp" ,
//         id: 2
//     },
//     {
//         title: "Casco Bicicleta Mtb Lazer Compact Mips Dlx C/ Luz - Ciclos" ,
//         price: 17000 ,
//         thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_907040-MLA47920761376_102021-F.webp" ,
//         id: 3
//     }
// ]


io.on('connection', (socket) => {
    console.log('New client connection!')
   
    // Send messages
    socket.emit('products', products.listAll())
  

    socket.on('newProduct', (product) => {
        console.log(product)
        products.save(product)
        io.emit('newProduct', product)
      })
  })



