const express = require('express')
const routes = express.Router()

const userDetail = require('../controllers/users')

routes.post('/register', userDetail.userRegistrationController)

module.exports = routes