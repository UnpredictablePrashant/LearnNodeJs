const express = require('express');
const app = express();
// const __dirname = "templates"

app.use((req, res, next) => {
    console.log("Middleware function")
    next()
})

app.get('/', (req, res) => {
    console.log("hello world")
    // res.send("hello world")
    res.sendFile(__dirname + '/templates/index.html')
})

app.get('/user', auth, (req, res) => {
    res.send("Users")
})

function auth(req, res, next){
    if(req.query.admin == 'true'){
        next()
    }
    else{
        res.send('No Auth')
    }

}

app.listen(3000, function(){
    console.log('Server started at http://localhost:3000')
})