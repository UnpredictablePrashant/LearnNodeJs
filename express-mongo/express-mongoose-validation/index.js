const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/mongovalidation')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'faculty']
    },
    password: {
        type: String,
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    },
    age: {
        type: Number,
        validate: {
            validator: function (value) {
                return value >= 18 && value <= 99;
            },
            message: 'Age must be between 18 and 99'
        }
    },
    accountCreation: {
        type: Date,
        default: Date.now()
    }
});
const User = mongoose.model('userDetail',userSchema)

app.use(express.json())

app.post('/addEntry',(req,res)=>{
    console.log(req.body)
    try{
        const user1 = new User({
            name: req.body.name, 
            email: req.body.email,
            role: req.body.role,
            password: req.body.password,
            age: req.body.age
        })
        user1.save().then(data => res.send('Data added')).catch(err => res.send("Something went wrong!"))
    }catch{
        res.send("Data in not right format")
    }
    
})

app.get('/fetchAllEntry',(req,res)=>{
    try{
        User.find({})
        .then(data => res.send(data))
        .catch(err=> res.send("Something went wrong!"))
    }catch{
        res.send("Something went wrong!")
    }
})

app.listen(3000, ()=> console.log("Server started at http://localhost:3000"))