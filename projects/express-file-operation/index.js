const express = require('express')
const fs = require('fs')

const app = express()
app.use(express.json())

app.get('/hello', (req, res) => {
    res.status(200).send("hello world")
})

app.get('/user', (req, res) => {
    fs.readFile('data.json', 'utf-8', (err, data) => {
        console.log(data)
        res.send(data)
    })
})

app.post('/user', (req, res) => {
    let val = JSON.stringify(req.body)
    fs.readFile('data.json', 'utf-8', (err, data) => {
        let currVal = JSON.parse(data)
        currVal.push(JSON.parse(val))
        console.log(currVal)

        fs.writeFile('data.json', JSON.stringify(currVal), function (err) {
            if (err)
                res.status(404).send("ERROR in appending");
            else {
                console.log("Data appended");
                res.status(201).send('Data Added')
            }

        })
    })
})

app.put('/user', (req, res) => {
    res.send("PUT Request Called")
})

app.delete('/user', (req, res) => {
    //pop to delete
    // delete can be used but will leave undefined hole
    res.send("DELETE Request Called")
})

app.listen(3005, () => {
    console.log("server is runnning at 300S")
})