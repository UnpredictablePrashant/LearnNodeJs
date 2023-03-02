const express = require("express");
const app = express();
const fs = require("fs");
const videoPath = "perfect.mp4";
const advideoPaths = "ads.mp4";
const CHUNK_SIZE = 10 ** 6; // 1000000 bytes = 1 mb

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

// more code will go in here just befor the listening function
app.get("/video", function (req, res) {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    console.log(range)
    const videoSize = fs.statSync(videoPath).size;
    console.log(videoSize)
    const start = Number(range.replace(/\D/g, ""));
    console.log(start)
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    console.log(end)
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
});

app.get('/traditionalvideo', (req, res) => {

    try {
        let data = fs.readFileSync(videoPath);
        console.log("d: ", data);
        res.send(data)
    } catch (err) {
        console.error(err);
        res.status(500).send("Something bad happened");
    }
})

app.get('/bettervideo', (req, res) => {

    try {
        fs.readFile(videoPath, (err, data) => {
            console.log("d: ", data);
            res.send(data)
        })
    } catch (err) {
        console.error(err);
        res.status(500).send("Something bad happened");
    }
})

// app.get('/adsstream', (req, res) => {
//     const range = req.headers.range;
//     //https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Range
//     console.log('range', range)
//     if (!range) {
//         res.status(400).send("Requires Range header");
//     }
//     const videoSize = fs.statSync(videoPath).size;
//     const adSize = fs.statSync(advideoPaths).size;
//     const totalSize = videoSize + adSize
//     console.log("videosize", totalSize)
//     const start = Number(range.replace(/\D/g, ""));
//     console.log('start', start)
//     //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Cheatsheet
//     const end = Math.min(start + CHUNK_SIZE, totalSize - 1);
//     console.log('end', end)
//     const contentLength = end - start + 1;
//     console.log('content length', contentLength)

//     const headers = {
//         "Content-Range": `bytes ${start}-${end}/${totalSize}`,
//         "Accept-Ranges": "bytes",
//         "Content-Length": contentLength,
//         "Content-Type": "video/mp4",
//     };
//     res.writeHead(206, headers);

//     for (let i = 0; i < 2; i++) {
//         if (i == 0) {
//             vPath = advideoPaths
//         } else {
//             vPath = videoPath
//         }
//         let videoStream = fs.createReadStream(vPath, { start, end });
//         videoStream.pipe(res);

//     }

// })

app.listen(8000, function () {
    console.log("Listening on port 8000!");
});