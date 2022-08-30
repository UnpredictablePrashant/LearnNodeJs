const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path');
const mongoose = require('mongoose')

const app = express()
mongoose.connect('mongodb://127.0.0.1:27017/fileupload')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const fileUpload = {
    fileName: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}

const FileUpload = mongoose.model('files',fileUpload)

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
    const newFile = FileUpload.create({
        fileName: req.file.filename
    })   
    res.redirect('/files')
})

app.get('/filelist', (req,res)=>{
    const files = FileUpload.find({},(err,docs)=>{
        if(err){
            res.send("Something went wrong!")
        }else{
            res.send(docs)
        }
    });
    
})

app.get('/files',(req,res)=>{
    res.sendFile(__dirname+'/views/display.html')
})

app.get('/fetchFile/:filename',(req,res)=>{
    res.sendFile(__dirname + "/uploads/"+req.params.filename)
})

app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000")
})