const db = require('./conn').db
const mongoose = require('./conn').mongoose

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

let userModel = mongoose.model('users', userSchema)
module.exports = { userModel }