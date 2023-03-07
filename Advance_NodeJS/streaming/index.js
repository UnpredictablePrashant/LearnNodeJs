const fs = require('fs')
const express = require('express')

const app = express()

app.get('/request', (req,res)=>{

    const rstream = fs.createReadStream('index.txt')
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