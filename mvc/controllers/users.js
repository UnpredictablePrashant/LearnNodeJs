const userModelCtrl = require('../models/userModel')

async function userRegistrationController(req, res){
    console.log(req.body)
    let userData = userModelCtrl.userModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    userData.save((err, result)=>{
        if(err){
            res.send("ERROR")
        }else{
            res.send("User registered successfully")
        }
    })
}

module.exports = { userRegistrationController }