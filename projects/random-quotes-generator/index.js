const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/ajaxdata')
const dataschema = {
    id: Number,
    quotes: String,
    author: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
}

const Data = mongoose.model('quotes', dataschema)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/data', (req,res)=>{
    
    Data.findOne({}, {}, { sort: { 'id' : -1 } }, function(err, docs){
        if (err){
            res.send("ERROR")
        }else{
            var ranId = Math.floor(Math.random() * docs.id);

            Data.findOne({ id: ranId }, (err,docs)=>{
                if(err){
                    res.send("No Data")
                }else{
                    res.send(docs)
                }
            }) 
        }
    })
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/views/index.html')
})

app.post('/addQuotes', (req,res)=>{
    
    Data.findOne({}, {}, { sort: { 'id' : -1 } }, function(err, docs){
        if (err){
            res.send("ERROR")
        }else{
            const data = new Data({
                id: docs.id+1,
                quotes: req.body.quotes,
                author: req.body.author
            })
            data.save((err,docs)=>{
                if(err){
                    res.send("ERROR")
                }else{
                    res.send("Data Saved")
                }
            })
        }
    })
})

app.listen(3000)