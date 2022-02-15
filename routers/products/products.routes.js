const express = require('express')
const colors = require('colors')
const { products } = require('../../data/data')

const router = express.Router()

// Return an array with all products
router.get('/', (req,res)=>{
    console.log(colors.bold.bgWhite.black(`-- get /productos -- ejecutado`))
    res.send(products)
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    console.log(colors.bold.bgWhite.black(`-- get /productos/:id -- ejecutado, id = ${id}`))
    const product = products.find(product => product.id === +id)
    if (!product) {
        return res
            .status(404)
            .json({ success: false, error: `Product with id: ${id} does not exist!`})
      }
    return res
        .json({ success: true, result: product })
})

router.post('/', (req, res) => {
    let obj = req.body
    console.log(colors.bold.bgWhite.black(`-- post /productos -- ejecutado, obj = \n${JSON.stringify(obj)}`))
    const id = products[products.length - 1].id
    obj['id'] = id + 1
    products.push(obj)
    res.json(obj)
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    console.log(colors.bold.bgWhite.black(`-- put /productos/:id -- ejecutado, id = ${ id }`))
    const { title, price, thumbnail } = req.body
    let obj = {
        title,
        price,
        thumbnail,
        id
    }
    products[ id - 1 ] = obj
    res
        .status(200)
        .json({success: true, result: products[ id - 1 ]})
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    console.log(colors.bold.bgWhite.black(`-- delete /productos/:id -- ejecutado, id = ${ id }`))
    const productIndex = products.findIndex(product => product.id === +id)
    if (productIndex < 0) 
        return res
                .status(404)
                .json({ success: false, error: `Product with id: ${id} not found!`})
    products.splice(productIndex, 1)
    return res.json({
            success: true, 
            result: `Product with id: ${id} deleted. There are ${products.length} products registered now.`
            }) 
})



module.exports = router