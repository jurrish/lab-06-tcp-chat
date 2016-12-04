'use strict';

let net = require('net');
let EventEmitter = require('events');
let Client = require('./client.js');

let ee = new EventEmitter();
let server = net.Server();
let PORT = process.env.PORT || 3000;
let users = [];


ee.on('\\all', (user, string) => {
  console.log('all');
  users.forEach(u => {
    u.socket.write(user.nickName + ' : ' + string);
  });
});

ee.on('\\nick', (user, string) => {
  console.log('nick');
  user.nickName = string.trim();
});

ee.on('\\dm', (user, string) => {
  console.log('dm');
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join(' ').trim();
  users.forEach(u => {
    if (u.nickName === nickname) {
      u.socket.write(user.nickName + ' : ' + message);
    }
  });
});

ee.on('default', (user) => {
  console.log('default');
  user.socket.write('default: no command entered');
});

server.on('error', (err) => {
  console.log(err);
});

server.on('connection', (socket) => {
  let user = new Client();
  users.push(user);
  socket.on('data', (data) => {
    let command = data.toString().split(' ').shift().trim();
    if (command.startsWith('\\')) {
      ee.emit(command, user, data.toString().split(' ').slice(1).join());
      return;
    }
    ee.emit('default', user, data.toString());
  });
});

server.listen(PORT, () => {
  console.log('listening on ' + PORT);
});