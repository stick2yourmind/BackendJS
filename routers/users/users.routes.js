const { Router } = require('express')
const {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUserById
} = require('../../controllers/users.controllers')

const router = Router()

router.post('/', createUser)

router.delete('/:id', deleteUserById)

router.get('/', getAllUsers)

router.get('/:id', getUserById)

router.get('/email/:email', getUserByEmail)

router.put('/:id', updateUserById)

module.exports = router
