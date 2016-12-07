'use strict';

const net = require('net');
const EE = require('events');

const Client = require('./model/client');

const PORT = process.env.PORT || 3000;

const pool = []; //list of connected clients aka client pool
const server = module.exports = net.createServer();
const ee = new EE();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
ee.on('\\nick', function(client, string) {
  client.nickname = string.trim();
  c.socket.write(`You changed your nickname to ${client.nickname}`)
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
    c.socket.write(`${client.nickname}: ` + string);
  });
});

ee.on('\\quit', function(client) {
  let i = pool.slice(pool.indexOf(client));
  pool[i].socket.end();
  // if (i != -1) pool.splice(i, 1);
  // let pool = pool.filter(clients => clients !== client);
  pool.forEach( c => {
    c.socket.write(`${client.nickname} has left the room.`);
  });
});

ee.on('default', function(client) {
  client.socket.write('not a command\n');
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
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

  socket.on('close', function(data) {
    ee.emit('quit', client, data.toString());
    console.log('socket closed');
  });

  socket.on('error', function(err) {
    console.log('Error: ', err);
  });

});

server.listen(PORT, function() {
  console.log('server running on port', PORT);
});
