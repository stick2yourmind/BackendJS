const { AuthorsDao } = require('../models/daos/index')

const authorsDao = new AuthorsDao()

const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await authorsDao.getAll()
    res.json({ authors, success: true })
  } catch (error) {
    next(error)
  }
}

const getAuthorById = async (req, res, next) => {
  const { id } = req.params
  try {
    const authors = await authorsDao.getById(id)
    res.json({ authors, success: true })
  } catch (error) {
    next(error)
  }
}

const getAuthorByEmail = async (req, res, next) => {
  const { email } = req.params
  try {
    const author = await authorsDao.getByEmail(email)
    res.json({ author, success: true })
  } catch (error) {
    next(error)
  }
}
const createAuthor = async (req, res, next) => {
  try {
    const newAuthor = await authorsDao.create(req.body)
    res.json({ result: newAuthor, success: true })
  } catch (error) {
    next(error)
  }
}

const updateAuthorById = async (req, res, next) => {
  const { params: { id }, body } = req
  try {
    const updatedAuthor = await authorsDao.updateById(id, body)
    res.json({ result: updatedAuthor, success: true })
  } catch (error) {
    next(error)
  }
}

const deleteAuthorById = async (req, res, next) => {
  const { id } = req.params
  try {
    const deletedAuthor = await authorsDao.deleteById(id)
    res.json({ result: deletedAuthor, success: true })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createAuthor,
  deleteAuthorById,
  getAllAuthors,
  getAuthorByEmail,
  getAuthorById,
  updateAuthorById
}
