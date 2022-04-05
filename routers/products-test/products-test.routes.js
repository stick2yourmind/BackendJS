const { Router } = require('express')
const getRandomGenerator = require('../../controllers/productsTest.controllers')


const router = Router()

router.get('/', getRandomGenerator)


module.exports = router