const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
const mainRoutes = require('./routes/main')
const userRoutes = require('./routes/user')

app.use('/', mainRoutes)
app.use('/user', userRoutes)

app.listen(3005, ()=>{
    console.log("Server started at http://127.0.0.1:3005")
})