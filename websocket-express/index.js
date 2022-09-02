const express = require('express');

const app = express();
const server = require('http').createServer(app)

const io = require('socket.io')(server, {cors: {origin: "*"}});


server.listen(4000, () => {
    console.log('Server Started..');
});

app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/index.html')
})


app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('socket connected..', socket.id);

    socket.on('chat', (data) => {
        console.log(data)
        // io.sockets.emit('chat', data);
        socket.broadcast.emit('chat', data)
    });

});