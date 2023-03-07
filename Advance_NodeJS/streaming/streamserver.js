const express = require("express");
const app = express();
const fs = require("fs");
const videoPath = "ads.mp4";
const CHUNK_SIZE = 10 ** 6; // 1000000 bytes = 1 mb

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

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

app.listen(8000, function () {
    console.log("Listening on port 8000!");
});