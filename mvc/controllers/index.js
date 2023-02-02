var path = require('path')

function index(req,res){
    res.sendFile(path.resolve(__dirname+'/../views/index.html'))
}

module.exports = { index }