'use strict';

let net = require('net');
let EventEmitter = require('events');

let ee = new EventEmitter();
let server = net.Server();

server.on('error', (err) => {
  console.log(err);
});

ee.on('serverEvent', () => {
  console.log(server);
});
ee.emit('serverEvent');
