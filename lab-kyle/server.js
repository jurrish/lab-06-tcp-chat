'use strict';

const net = require('net');
const EE = require('events');

const Client = require('./model/client');

const PORT = process.env.PORT || 3000;

const pool = []; //list of connected clients aka client pool
const server = net.createServer();
const ee = new EE();

ee.on('\\nick', function(client, string) {
  client.nickname = string.trim();
});

ee.on('\\dm', function(client, string) {
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join(' ').trim();

  pool.forEach(c => {
    if (c.nickname === nickname) {
      c.socket.write(`${client.nickname}: ${message}`);
    }
  });
});

ee.on('\\all', function(client, string) {
  pool.forEach( c => {
    c.socket.write(`${client.nickname} ` + string);
  });
});

ee.on('default', function(client, string) {
  client.socket.write('not a command');
});

server.on('connection', function(socket) {
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

server.on('close', function(socket) {
  // remove socket from client pool
});

server.on('error', function(socket) {
  // throw error to server
});

server.listen(PORT, function() {
  console.log('server running on port', PORT);
});
