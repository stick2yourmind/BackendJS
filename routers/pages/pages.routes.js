const { Router } = require('express')
const {
  authUser,
  renderProducts,
  renderSign,
  logoutUser
} = require('../../controllers/pages.controllers')

const router = Router()

router.get('/', renderProducts)

router.get('/productos', renderProducts)

router.get('/login-register', renderSign)

router.get('/logout', logoutUser)

router.post('/login-register', authUser)

module.exports = router
