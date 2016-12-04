'use strict';

const net = require('net');

const client = new net.Socket();

client.connect( { host: '127.0.0.1', port: 43593 }, function() {
  console.log('Connected to server.');
  setTimeout(function() {
    client.write('Hello my name is test..');
  }, 1000);
  setTimeout(function() {
    client.write('/nick test');
  }, 2000);
  setTimeout(function() {
    client.write('/dm test hey');
  }, 3000);
  setTimeout(function() {
    client.write('/all This is a special broadcast.');
  }, 4000);
});

client.on('data', function(data) {
  console.log(data.toString());
});

client.on('end', function() {
  console.log('Disconnected from server.');
});
