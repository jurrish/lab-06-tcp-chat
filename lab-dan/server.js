'use strict';

const net = require('net');
const EE = require('events');

const PORT = process.env.PORT || 3000;

function start (chatClient, cb) {
  let pool = [];
  const server = net.createServer;
  const ee = new EE();

  server(function() {
    ee.on('default', function (client) {
      client.socket.write('not a command');
    });

    server.on('connection', function (socket) {
      let client = chatClient(socket);
      pool.push(client);
      socket.on('data', function () {
        ee.emit('default', client);
      });
    });

    server.listen(PORT, function() {
      console.log('server started on', PORT);
      if (cb) {
        cb();
      }
    });
  });
}

exports.start = start;
