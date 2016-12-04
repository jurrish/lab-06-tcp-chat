'use strict';

const net = require('net');

const PORT = process.env.PORT || 3000; // Setup ENV vars

const pool = [];
const server = net.createServer();

server.on('connection', function(socket) {
  pool.push(socket);

  socket.on('data', function(data) {
    pool.forEach(client => {
      client.write(data);
    });
  });
});

server.listen(PORT, function() {
  console.log('Server Running on PORT', PORT);
});