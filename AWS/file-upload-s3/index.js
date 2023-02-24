const express = require('express')
const { S3Client } = require('@aws-sdk/client-s3');

const dotenv = require('dotenv')
const path = require('path')
const multer = require('multer')
const multerS3 = require('multer-s3')

dotenv.config()

const app = express()



let s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
  });

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString()+path.parse(file.originalname).name+ path.extname(file.originalname))
      }
    })
  })



app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/views/index.html')
})

app.post('/upload',upload.single("imgFile"),(req,res)=>{
    try{
        console.log(req.file)
        console.log(req.file.location)
        res.send({'result':'Uploaded'})
    }catch{
        res.send('Something went wrong')
    }
    
})

app.listen(3000,()=>{
    console.log('Server started at http://localhost:3000')
})