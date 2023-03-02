const fs = require('fs')
const express = require('express')

const app = express()

app.get('/request', (req,res)=>{
    // fs.readFile('rockyou.txt', (err, data)=>{
    //     if(err){
    //         return console.log(err)
    //     }else{
    //         console.log(data.toString())
    //         res.end((data.toString()))
    //     }
    // })
    const rstream = fs.createReadStream('rockyou.txt')
    rstream.on('data',  (chunkData)=>{
        res.write(chunkData)
    })
    rstream.on('end', ()=>{
        res.end()
    })
    rstream.on('error', ()=>{
        res.end('file not found')
    })
})

app.listen(3000)