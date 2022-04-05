const { Router } = require('express')
const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthorById,
  deleteAuthorById
} = require('../../controllers/authors.controllers')

const router = Router()

router.get('/', getAllAuthors)

router.get('/:id', getAuthorById)

router.post('/', createAuthor)

router.put('/:id', updateAuthorById)

router.delete('/:id', deleteAuthorById)

module.exports = router
