const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())

const PORT = 5000
const jwtSecretKey = "somesecretkey"


app.post("/user/generateToken", (req, res) => { 
    let data = {
        time: Date(),
        userId: 12,
    }
    const token = jwt.sign(data, jwtSecretKey);
    // console.log(token)
    res.send(token);
});

app.get("/user/validateToken", (req, res) => {
    // console.log(req.headers)
  
    try {
        const token = req.header('jwttoken')
        // console.log(token)
  
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.send("Successfully Verified");
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});
  
app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}`);
});