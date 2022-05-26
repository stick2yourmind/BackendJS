const { Router } = require('express')
const {
  renderProducts,
  renderProductDetails,
  renderSign,
  logoutUser,
  renderLoginError,
  renderInfo,
  renderInfoZip,
  renderProfile,
  renderRegisterError
} = require('../../controllers/pages.controllers')
const passport = require('../../middlewares/passport')
const compression = require('compression')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, 'public/avatars') },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split('/')[1]
    cb(null, `${file.fieldname}-${Date.now()}.${extension}`)
  }
})

const upload = multer({ storage })

const router = Router()

router.get('/', renderProducts)

router.get('/productos', renderProducts)
router.get('/productos/:productId', renderProductDetails)
router.get('/info', renderInfo)
router.get('/profile', renderProfile)
router.get('/infozip', compression(), renderInfoZip)

router.get('/login-register', renderSign)
router.get('/loginError', renderLoginError)
router.get('/registerError', renderRegisterError)

router.get('/logout', logoutUser)

router.post('/login', passport.authenticate('login', { failureRedirect: '/loginError' }), (req, res) => {
  res.redirect('/productos')
})
router.post('/register', upload.single('avatar'), passport.authenticate('register', { failureRedirect: '/registerError' }), (req, res) => {
  res.redirect('/productos')
})

module.exports = router
