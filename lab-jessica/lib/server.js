'use strict';
const Client = require('./client.js');
const net = require('net');
const EE = require('events');

const PORT = process.env.PORT || 3000;
const ee = new EE();
let pool = [];

const server = net.createServer();

// Clients should have a unique 'nickname'
// e.g. guest-43
// When sockets are connected with the ClientPool they should be given event listeners for data, error, and close events
// When a socket emits the error event the error should be logged on the server
// When a socket emits the data event the data should be logged on the server and the \wack commands below should be implemented
// Wack commands '\'
//
// \all should trigger a broadcast event
// \nick should allow a user change their nickname
// \dm should allow a user to send a message directly to another user by nick name
// when a user speaks their nickname should be printed
// i.e. teapot: Sup Hacker?

//////////////

ee.on('\\nick', function(client, string){
  client.nickname = string.trim();
});

ee.on('\\dm', function(client, string){
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join(' ').trim();

  pool.forEach( c => {
    if (c.nickname === nickname){
      c.socket.write(`${client.nickname}: ${message}`);
    }
  });

});

ee.on('\\all', function(client, string){
  pool.forEach( c => {
    c.socket.write(`${client.nickname}: ` + string);
  });
});

ee.on('default', function(client, string) {
  client.socket.write('not a command');
});

server.on('connection', function(socket) {
  console.log('WE ARE CONNECTED YAY');
  const client = new Client(socket);
  pool.push(client);
  // console.log(pool); //im in the ppo;
  socket.on('data', function(data) {
    const command = data.toString().split(' ').shift().trim();

    if(command.startsWith('\\')) {
      ee.emit(command, client, data.toString().split(' ').slice(1).join(' '));
      return;
    }

    ee.emit('default', client, data.toString());

  });

  socket.on('close', function() {
    const clientIndex = pool.indexOf(client);
    pool.splice(clientIndex, 1);
    console.log(pool);
    console.log('we closed the connection');
    socket.destroy();
    console.log(socket.destroyed);
  });
});

server.listen(PORT, function(){
  console.log('server running on port', PORT);
});
