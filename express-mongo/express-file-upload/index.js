const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path');


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() +path.parse(file.originalname).name+ path.extname(file.originalname));
    }
});


const upload = multer({ storage: storage })


app.get('/hello', (req,res)=>{
    res.send("Hello World!")
})

app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/views/index.html')
})

app.post('/upload',upload.single("imgFile"),(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    res.send("Uploaded successfully")

})

app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000")
})