const express = require('express')
// const colors = require('colors')

const apiRoutes = require('./routers/index')

const PORT = process.env.PORT || 8080
const app = express()
const path = require('path');

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static(path.resolve(__dirname, './public')));

// Routes
app.use('/api', apiRoutes)

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

const connectedServer = app.listen(PORT, ()=>{
    console.log(`Server is up and running on port ${PORT}`)
})

connectedServer.on('error', (error)=>{
    console.log(`An error has ocurred: ${error}`)
})



