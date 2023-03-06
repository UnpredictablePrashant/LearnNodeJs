const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
app.use(express.json())

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/socketdb');


// Define a schema for the data
const dataSchema = new mongoose.Schema({
  name: String,
  age: Number,
  timestamp: { type: Date, default: Date.now }
});

// Create a model for the data
const Data = mongoose.model('Data', dataSchema);

// Connect to Socket.io
io.on('connection', function (socket) {
  console.log('A user connected');
  Data.find({}).then(
    data => socket.emit('allData', data)
  ).catch(err => console.log(err))
  // let inserts = Data.watch([{ $match: { operationType: 'insert' } }]);
  // inserts.on('change', async function(data) {
  //   console.log(data)
  //   let name = data.fullDocument.name;
  //   if (name === 'time to go.') {
  //     console.log('ok I\'m leaving.');
  //     return inserts.driverChangeStream.close();
  //   } else {
  //     console.log(name);
  //   }
  // });


  // Watch for changes in the MongoDB collection
  if (mongoose.connection.readyState !== 1) {
    console.log('Mongoose is not connected');
  }
  let pipeline = [
    {
      $match: {
        operationType: 'insert'
      }
    }
  ];
  
  let changeStream = Data.watch(pipeline)
  .on('change', data => console.log(data))

  console.log(changeStream)
  changeStream.on('change', function (change) {
    console.log('Change stream event:', change);

    // Send the new or updated data to the client
    if (change.operationType === 'insert') {
      socket.emit('newData', change.fullDocument);
      console.log(change.fullDocument)
    } else if (change.operationType === 'update') {
      Data.findById(change.documentKey._id, function (err, data) {
        if (err) throw err;
        socket.emit('newData', data);
      });
    }
  });

  socket.on('disconnect', function () {
    console.log('A user disconnected');
    // changeStream.close();
  });
});

// Serve the HTML page
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/adddata', (req, res) => {
  let d = new Data({
    name: req.body.name,
    age: req.body.age
  })
  d.save().then(() => {
    res.send("Data Added")
  }).catch((err) => {
    res.send("ERR")
  })
  Data.watch(pipeline).on('change', data => console.log('inside the add',data))

})

// Start the server
http.listen(3000, function () {
  console.log('Listening on port 3000');
});
