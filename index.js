const express = require('express')
const colors = require('colors')

const { Contenedor } = require("./contenedor")
const PORT = process.env.PORT || 8080
const app = express()
const archivoContenedor = new Contenedor('productos.txt')
// Middleware
app.use(express.json())

app.get('/productos', async (req,res)=>{
    console.log(colors.bold.bgWhite.black(`-- get /productos -- ejecutado`))
    let arr = await archivoContenedor.getAll()
    res.send(arr)
})

app.get('/productoRandom', async (req,res)=>{
    console.log(colors.bold.bgWhite.black(`-- get /productoRandom -- ejecutado`))
    let arr = await archivoContenedor.getAll()
    let randomIndex = Math.floor(Math.random() * arr.length)
    res.send(arr[randomIndex])
})

const connectedServer = app.listen(PORT, ()=>{
    console.log(`Server is up and running on port ${PORT}`)
})

connectedServer.on('error', (error)=>{
    console.log(`An error has ocurred: ${error}`)
})



