const { Router } = require('express')
const {
  authUser,
  renderProducts,
  renderSign,
  logoutUser,
  renderLoginError,
  renderRegisterError
} = require('../../controllers/pages.controllers')
const passport = require('../../middlewares/passport')

const router = Router()

router.get('/', renderProducts)

router.get('/productos', renderProducts)

router.get('/login-register', renderSign)
router.get('/loginError', renderLoginError)
router.get('/registerError', renderRegisterError)

router.get('/logout', logoutUser)

router.post('/login-register', passport.authenticate('authUser', { failureRedirect: '/loginError' }), authUser)
router.post('/login', passport.authenticate('login', { failureRedirect: '/loginError' }), (req, res, next) => {
  res.redirect('/productos')
})
router.post('/register', passport.authenticate('register', { failureRedirect: '/registerError' }), (req, res, next) => {
  res.redirect('/productos')
})

module.exports = router
