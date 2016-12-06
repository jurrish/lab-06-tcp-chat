'use strict';

let net = require('net');
let EE = require('events');
let Client = require('./client.js');

let PORT = process.env.PORT || 3000;
let users = [];
let ee = new EE();

let server = net.createServer(function(client) {
  console.log('client connected');
  console.log('users');
  console.log(users);
  client.on('end', function() {
    console.log('client disconnected');
  });
});


ee.on('/all', function(user, string) {
  console.log('all');
  users.forEach(u => {
    u.socket.write(user.nickName + ' : ' + string);
  });
});

ee.on('/nick', function(user, string) {
  console.log('nick');
  user.nickName = string.trim();
  console.log(user.nickName);
});
//
// ee.on('/dm', function(user, string) { //dm not working
//   console.log('dm');
//   let nickname = string.split(' ').shift().trim();
//   console.log(nickname);
//   let message = string.split(' ').slice(1).join(' ').trim();
//   console.log(message);
//   users.forEach(function(u) {
//     if (u.nickName === nickname) {
//       u.socket.write(user.nickName + ' : ' + message);
//     }
//   });
// });

ee.on('default', function(user) {
  console.log('default');
  user.socket.write('default: no command entered');
});

server.on('error', function(err) {
  console.log(err);
});

server.on('connection', function(connection) {
  let user = new Client(connection);
  users.push(user);
  connection.on('data', function(data) {
    console.log(data);
    let command = data.toString().split(' ').shift().trim();
    console.log(data.toString().split(' ').slice(1).join());
    console.log(command);
    if (command.startsWith('/')) {
      ee.emit(command, user, data.toString().split(' ').slice(1).join());
      return;
    }
    ee.emit('default', user, data.toString());
  });
});

server.listen(PORT, function() {
  console.log('listening on ' + PORT);
});