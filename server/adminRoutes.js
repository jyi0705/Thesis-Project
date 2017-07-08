const adminRouter = require('express').Router()

const AdminController = require('./adminController')
let autho = true

adminRouter.put('/',  (req, res, next) => {
  if(autho) {
    next()
  } else {
    res.sendStatus(401)
  }
},AdminController.addTestResultToUser)

module.exports = adminRouter