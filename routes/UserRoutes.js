const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.route('/')
.get(UserController.getAllUsers)
.post(UserController.createNewUser)
.patch(UserController.updateUser)
.delete(UserController.deleteUser)

module.exports = router