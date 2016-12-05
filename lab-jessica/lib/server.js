'use strict';

const Client = require('./client.js');
const net = require('net');
const EE = require('events');

const PORT = process.env.PORT || 3000;
const ee = new EE();

function start() {
  let pool = [];

  const server = net.createServer();

  ee.on('\\nick', function(client, string){
    client.nickname = string.trim();
    console.log(client.nickname);
  });

  ee.on('\\dm', function(client, string){
    console.log('string', string);
    let nickname = string.split(' ').shift().trim();
    let message = string.split(' ').slice(1).join(' ').trim();
    console.log('nickname', nickname);
    console.log('message', message);

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

  ee.on('default', function(client) {
    client.socket.write('not a command');
  });

  server.on('connection', function(socket) {
    console.log('WE ARE CONNECTED YAY: mssg from server.js');
    const client = new Client(socket);
    pool.push(client);

    socket.on('data', function(data) {
      console.log('data', data.toString());
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

    socket.on('error', function(err) {
      console.log('what error');
      console.log(err);
    });

    // socket.emit('error', err);

  });

  server.listen(PORT, function(){
    console.log('server running on port', PORT);
  });
}

start();

module.exports = start;
