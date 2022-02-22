const express = require('express')
// import { engine } from 'express-handlebars'
const { engine } = require('express-handlebars')
const productRoutes = require('./routers/index')

const PORT = process.env.PORT || 8080
const app = express()
const path = require('path');

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static(path.resolve(__dirname, './public')));

// Routes
app.use('/', productRoutes)

// // Renders public/index.html
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, '/index.html'));
// })



// Setting path where will views be
app.set('views', './views')
// Connecting views with EJS engine templates
app.set('view engine', 'ejs')

// Renders index.handlebars
app.get('/', function(req, res) {
    res.render('index')
})




const connectedServer = app.listen(PORT, ()=>{
    console.log(`Server is up and running on port ${PORT}`)
})

connectedServer.on('error', (error)=>{
    console.log(`An error has ocurred: ${error}`)
})



