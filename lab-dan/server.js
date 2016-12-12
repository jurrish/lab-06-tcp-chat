'use strict';

const net = require('net');
const EE = require('events');

const PORT = process.env.PORT || 3000;

function start (chatClient, cb) {
  let pool = [];
  const ee = new EE();

  let server = net.createServer();

  server.on('connection', function (socket) {
    let client = chatClient(socket);
    pool.push(client);
    socket.on('data', function (data) {
      console.log('data received from client!');
      console.log('data:', data.toString());
      const command = data.toString().split(' ').shift().trim();
      console.log(command.startsWith('\\'));
      if (command.startsWith('\\')) {
        console.log('emitting event');
        let message = data.toString().split(' ').slice(1).join(' ');
        console.log('command:', command, '\nmessage:', message);
        ee.emit(command, client, message, pool);
      } else {
        ee.emit('default', client);
      }
    });
  });

  server.listen(PORT, function() {
    console.log('server started on', PORT);
    if(cb) {
      cb(server);
    }
  });

  ee.on('default', function (client) {
    console.log('default event');
    client.socket.write('not a command');
  });

  ee.on('\\\\all', function (client, message, clientPool) {
    console.log(`${client.nickname} to everyone: ` + message);
    clientPool.forEach( c => {
      c.socket.write(`${client.nickname} to everyone: ` + message);
    });
  });

  ee.on('\\\\dm', function (client, message, clientPool) {
    console.log(`${client.nickname} to you: ` + splicedMessage);
    let nickname = message.split(' ').shift().trim();
    let splicedMessage = message.split(' ').splice(1).join(' ').trim();

    clientPool.forEach(c => {
      if (c.nickname === nickname) {
        c.socket.write(`${client.nickname} to you: ` + splicedMessage);
      }
    });
  });

  ee.on('\\\\nick', function (client, newNickname) {
    client.nickname = newNickname.trim();
    client.socket.write(`Successfully changed nickname. Your new nickname is: ${client.nickname}`);
  });
}

exports.start = start;
