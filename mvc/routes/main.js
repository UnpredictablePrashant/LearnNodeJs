const express = require('express')
const routes = express.Router()

const helloDetails = require('../controllers/hello')
const indexDetails = require('../controllers/index')

routes.get('/hello', helloDetails.hello)
routes.get('/', indexDetails.index)

module.exports = routes