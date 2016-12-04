'use strict';

const net = require('net');
const EE = require('events');
const Client = require('./client');
// const uuid = require('node-uuid');
const PORT = process.env.PORT || 3000;
//setup server
const server = net.createServer();
const ee = new EE();
const pool = [];

//create a server
server.listen(PORT, function(){
  console.log('server listening on port: ' + PORT);
});
//create logic for event emissions
ee.on('default', function(client, string){
  client.socket.write(`${client.nickname}: ` + string);
});
ee.on('\\all', function(client, string){
  pool.forEach(c => {
    c.socket.write(`${client.nickname}: ` + string);
  });
});
ee.on('\\nick', function(client, string){
  console.log('creating a nickname');
  client.nickname = string.trim();
});
ee.on('connection', (client) => {
  //on 'connection', this event is emitted
  console.log('you are connected' + this);
  pool.push(client.nickname);
});
//create connection logic
server.on('connection', (socket) => {
  var client = new Client(socket);
  pool.push(client);
  socket.on('connection', () => {
    console.log(client.nickname + ' has connected to you');
    console.log('total number of connections: ' + pool.length);
    ee.emit('connection');
  });
  socket.on('data', (data) => {
    console.log('you\'re getting some data: ' + data);
    ee.emit('data');
  });
  socket.on('\\nick', () => {
    console.log('nickname is:' + client.nickname);
    ee.emit('\\nick');
  });
  socket.on('default', function(client, data) {
    ee.emit(client, data.toString());
  });
});
