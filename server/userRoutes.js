const userRouter = require('express').Router()

const UserController = require('./userController')

userRouter.post('/', UserController.create)
userRouter.get('/', UserController.getAllUsers)

module.exports = userRouter