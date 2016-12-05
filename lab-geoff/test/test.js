// ensure that all of your methods have test coverage
// write tests which start your server, send and receive, and confirm functionality
'use strict';
let assert = require('assert');
let net = require('net');

let client = net.createConnection({port:3000}, function() {
  console.log('connected');
  setTimeout(function() {
    client.write('some test here');
  }, 1000);
  setTimeout(function() {
    client.write('/nick newName');
  }, 2000);
  setTimeout(function() {
    client.write('/all howdy');
  }, 3000);
  client.on('end', function() {
    console.log('disconnected');
  });
});

