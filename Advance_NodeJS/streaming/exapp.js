const express = require('express')
const app = express()

const fs = require("fs")

app.get("/file", (req, res) => {
    readStream = fs.createReadStream('index.txt'),

   readStream.on('entry', (header, stream, next) => {
      stream.on('end', next);

      if (header.name === fileWanted) {
         const { size } = header;
         res.set({
           "Content-Type": 'text/html; charset=utf-8', // or whichever one applies
           "Content-Length": size,
           "Content-Range": `bytes 0-${size}/${size}`
         });
         stream.pipe(res);
      }
      else stream.resume();
   });
   readStream.pipe(extractor);
});
