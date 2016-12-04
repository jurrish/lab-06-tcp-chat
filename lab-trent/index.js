'use strict';

const net = require('net');
const server = net.createServer();

const clientHandler = require('./lib/clienthandler');
const Client = clientHandler.Client;

const PORT = 43593;

server.on('connection', function(conn) {
  new Client(conn);
});

server.listen(PORT, function() {
  console.log('Server listening at port: ' + PORT);
});
