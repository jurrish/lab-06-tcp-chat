'use strict';

const net = require('net');
const EE = require('events');

const Client = require('./model/client.js');

const PORT = process.env.PORT || 3000; // Setup ENV vars

const pool = [];
const server = net.createServer();
const ee = new EE();

ee.on('connection', function(konnect) {
  console.log('server connected',konnect);
});

ee.on('\\nick', function(client, string) {
  client.nickname = string.trim();
});

ee.on('\\dm', function(client, string) {
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join(' ').trim();

  pool.forEach( c => {
    if(c.nickname === nickname) {
      c.socket.write(`${client.nickname}: ${message}`);
    }
  });
});

ee.on('\\all', function(client, string) {
  pool.forEach( c => {
    c.socket.write(`${client.nickname}: ` + string);
  });
});

ee.on('default', function(client, string) {
  client.socket.write('Not a valid command!' + string);
});

server.on('connection', function(socket) {
  var client = new Client(socket);
  pool.push(client);
  console.log(client);
  console.log(socket);

  socket.on('data', function(data) {
    const command = data.toString().split(' ').shift().trim();

    if (command.startsWith('\\')) {
      ee.emit(command, client, data.toString().split(' ').slice(1).join(' '));
      return;
    }

    ee.emit('default', client, data.toString());

  });
});
server.listen(PORT, function() {
  console.log('Server Running on PORT', PORT);

});