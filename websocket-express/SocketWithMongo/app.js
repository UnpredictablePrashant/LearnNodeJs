const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const assert = require('assert');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/socketdb', { useNewUrlParser: true });
// This will work only with cloud mongo instance and not with local
// To work with local one need to put the replica set of the mongodb
const conn = mongoose.connection;
const Schema = mongoose.Schema;
app.use(express.json())


const dataSchema = new mongoose.Schema({
    name: String,
    age: Number,
});
const Data = mongoose.model('Data', dataSchema);

let inserts = Data.watch([{ $match: { operationType: 'insert' } }]);

inserts.on('change', async function(data) {
  let name = data.fullDocument.name;
  if (name === 'time to go.') {
    console.log('ok I\'m leaving.');
    return inserts.driverChangeStream.close();
  } else {
    console.log(name);
  }
});

inserts.on('close', function(){
  console.log('done.');
  process.exit(0);
});

http.listen(3000, function () {
    console.log('Listening on port 3000');
  });
  