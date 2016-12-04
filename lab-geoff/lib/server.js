'use strict';

let net = require('net');
let EventEmitter = require('events');
let Client = require('./client.js');

let ee = new EventEmitter();
let server = net.Server();
let PORT = process.env.PORT || 3000;
let users = [];

server.on('error', (err) => {
  console.log(err);
});
server.on('connection', () => {
  let user = new Client();
  users.push(user);
  console.log(user);
  console.log(users);
  //socket on data
  //->emit something
});

server.listen(PORT, () => {
  console.log('listening on ' + PORT);
});

//when socket connects create a new user
//need listeners for all the wack commands
//ClientPool
//something with socket
