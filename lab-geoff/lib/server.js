'use strict';

let net = require('net');
let EventEmitter = require('events');
// let client = require('./client.js');

let ee = new EventEmitter();
let server = net.Server();
let PORT = process.env.PORT || 3000;

server.on('error', (err) => {
  console.log(err);
});
server.listen(PORT, () => {
  console.log('listening on ' + PORT);
});
