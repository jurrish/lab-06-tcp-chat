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
  client.socket.write('not a valid command');
});
ee.on('\\all', function(client, string){
  pool.forEach(c => {
    c.socket.write(`${client.nickname}: ` + string);
  });
});
//this event listener is listening for \\nick(which is defined in the on('data') and emitted as ee.emit(//nick))
ee.on('\\nick', function(clientObject, string){
  console.log('creating a nickname');
  console.log(pool);
  clientObject.nickname = string.split(' ').slice(1).join(' ').trim();
});
ee.on('\\dm', function(client, string){
  let recipient = string.split(' ')[1];//second part of string that was sent
  let message = string.split(' ').slice(2).join(' ');//remainder of string that was emitted
  for(let i = 0; i < pool.length; i++){
    if(recipient === pool[i].nickname){
      console.log('recipient: ' + recipient, 'pool[i].nickname: ' + pool[i].nickname);
      pool[i].socket.write(message);
    }
  }
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
  console.log(client.nickname + ' has connected to you');
  console.log('total number of connections: ' + pool.length);
  socket.on('data', (data) => {
    console.log('you\'re getting some data: ' + data);
    // ee.emit('\\all', client, data);
  });
  //socket.on is listening for 'data' not //nick, so inside this new data event, listen for client typing, parse that info, then listen for it with a new ee up top
  socket.on('data', (data) => {
    if(data.toString().substring(0,5) === '\\nick'){
      console.log('nickname is: ' + client.nickname);
      ee.emit('\\nick', client, data.toString());//data.toString because ee.on(\\nick) is expecting a string not a buffer
      return;
    }else if(data.toString().substring(0,4) === '\\all'){
      console.log('you are broadcasting to all');
      ee.emit('\\all');
      return;
    } else if(data.toString().substring(0,3) === '\\dm'){
      console.log('trying to direct message');
      ee.emit('\\dm', client, data.toString());
      return;
    }
  });
  // socket.on('data', function(client, pool) {
  //   if(pool.toString().substring(0,3) === '\\all'){
  //     ee.emit('all');
  //   }
  // });
  socket.on('default', function(client, data) {
    ee.emit(client, data.toString());
  });
});
