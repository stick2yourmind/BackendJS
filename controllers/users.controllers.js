const DaosFactory = require('../models/daos/daos.factory')

const usersDao = DaosFactory.getDaos('users').UsersDao

const createUser = async (req, res, next) => {
  try {
    const newUser = await usersDao.create(req.body)
    res.json({ result: newUser, success: true })
  } catch (error) {
    next(error)
  }
}

const deleteUserById = async (req, res, next) => {
  const { id } = req.params
  try {
    const deletedUser = await usersDao.deleteById(id)
    res.json({ result: deletedUser, success: true })
  } catch (error) {
    next(error)
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    const users = await usersDao.getAll()
    res.json({ success: true, users })
  } catch (error) {
    next(error)
  }
}

const getUserByEmail = async (req, res, next) => {
  const { email } = req.params
  try {
    const user = await usersDao.getByEmail(email)
    res.json({ success: true, user })
  } catch (error) {
    next(error)
  }
}

const getUserById = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await usersDao.getById(id)
    res.json({ success: true, user })
  } catch (error) {
    next(error)
  }
}

const updateUserById = async (req, res, next) => {
  const { params: { id }, body } = req
  try {
    const updatedUser = await usersDao.updateById(id, body)
    res.json({ result: updatedUser, success: true })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUserById
}
