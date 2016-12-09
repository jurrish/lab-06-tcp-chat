'use strict';

const net = require('net');
const EE = require('events');
const Client = require('../model/client.js');

const PORT = process.env.PORT || 3000;
const pool = [];
const server = net.createServer();
const ee = new EE();

ee.on('\\nick', function(client, string){
  client.nickname = string.trim();
});

ee.on('\\dm', function(client, string){
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join(' ').trim();

  pool.forEach( c => {
    if (c.nickname === nickname){
      c.socket.write(`${client.nickname}: ${message}\n`);
    }
  });
});

ee.on('\\close', function(client, string) {
  var nickname = string.split(' ').shift().trim();
  for (var i=0; i<pool.length; i++) {
    if(nickname.id === pool[i].id ) {
      pool.splice(i, 1);
    }
  }
  ee.emit('\\all', client, 'has left the room.\n');
});

ee.on('\\all', function(client, string){
  pool.forEach( c => {
    c.socket.write(`${client.nickname}: ` + string);
  });
});

ee.on('default', function(client, string){
  client.socket.write('not a command\n');
});


server.on('connection', function(socket){
  var client = new Client(socket);
  pool.push(client);
  socket.on('data', function(data) {
    const command = data.toString().split(' ').shift().trim();

    if (command.startsWith('\\')) {
      ee.emit(command, client, data.toString().split(' ').slice(1).join(' '));
      return;
    }
    ee.emit('default', client, data.toString());
  });
});

ee.on('error', function(error) {
  console.error(error);
});

server.listen(PORT, function() {
  console.log('server running on port', PORT);
});
