'use strict';

const net = require('net');
const EE = require('events');

const Client = require('./model/client.js');

const PORT = process.env.PORT || 3000; // Setup ENV vars

const pool = [];
const server = net.createServer();
const ee = new EE();


module.exports = exports = {};

ee.on('\\nick', function(client, string) {
  client.socket.write('Your nickname is now ' + `${string.trim()}\n`);
  client.nickname = string.trim();
});

ee.on('\\dm', function(client, string) {
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join(' ').trim();

  pool.forEach( c => {
    if(c.nickname === nickname) {
      client.socket.write(`Message sent to  ${c.nickname}\n`);
      c.socket.write(`${client.nickname}: ${message}\n`);
    }
  });
});

ee.on('\\all', function(client, string) {
  pool.forEach( c => {
    c.socket.write(`${client.nickname}: ${string}\n`);
    // client.socket.write('Message seen by everyone\n');
  });
});

ee.on('default', function(client) {

  client.socket.write('Not Valid. Add back-slash first :-)\n');
});

ee.on('error', function(error) {
  console.error(error);
});


server.on('connection', function(socket) {
  let client = new Client(socket);
  pool.push(client);
  console.log(client, 'Connected');
  ee.emit('\\all', client, 'has joined the room.\n');

  console.log(client+ ' connections');

  socket.on('data', function(data) {
    const command = data.toString().split(' ').shift().trim();

    if (command.startsWith('\\')) {
      ee.emit(command, client, data.toString().split(' ').slice(1).join(' '));
      console.log(data);
      return;
    }

    ee.emit('default', client, data.toString());

  });

  socket.on('close', function() {
    pool.forEach(c => {
      if (client.id === c.id) {
        pool.splice(pool.indexOf(c), 1);
      }
    });
    ee.emit('\\all', client, 'has left the room.\n');
    // ee.emit('quit', client, data.toString());
    // console.log('Goodbye and Come Back Soon!');
  });

  socket.on('error', function(error) {
    ee.emit('You have encountered a problem', error);
  });

});
server.listen(PORT, function() {
  console.log('Server Running on PORT', PORT);
  // console.log(pool.length);
});
