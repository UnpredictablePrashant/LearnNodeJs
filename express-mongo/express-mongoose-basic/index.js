const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
mongoose.connect('mongodb://127.0.0.1:27017/basicapi')

const user = {
    name: {
        type: String
    },
    age: {
        type: Number
    }
}

const User = mongoose.model('userDetail',user)

app.use(bodyparser.json())

app.get('/hello',(req,res)=>{
    res.send('Hello World!')
})

app.post('/addEntry',(req,res)=>{
    console.log(req.body)
    const user1 = new User({
        name: req.body.name, 
        age: req.body.age
    })
    user1.save((err,result)=>{
        if(err){
            res.send("Something went wrong!")
        }else{
            res.send('Data added')
        }
    })
})

app.get('/fetchAllEntry',(req,res)=>{
    User.find({},(err,docs)=>{
        if(err){
            res.send("Something went wrong!")
        }else{
            res.send(docs)
        }
    })
})

app.get('/fetchUser/:name', (req,res)=>{
    console.log(req.params.name)
    User.find({name: req.params.name},(err,docs)=>{
        if(err){
            res.send("Something went wrong!")
        }else{
            res.send(docs)
        }
    })
})

app.listen(3000)