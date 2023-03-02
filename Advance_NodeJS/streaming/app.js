const express = require('express')
const fs = require('fs')
const app = express()

app.get('/stream', (req,res,next)=>{
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
  
    res.write("Thinking...");
    sendAndSleep(res, 4);
})

var sendAndSleep = function (response, counter) {
    if (counter > 10) {
      response.end();
    } else {
      response.write(" ;i=" + counter);
      counter++;
      setTimeout(function () {
        sendAndSleep(response, counter);
      }, 1000)
    };
  };

app.listen(3001, ()=> {
    console.log('server started at http://localhost:3001')
})