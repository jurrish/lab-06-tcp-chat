'use strict';

let net = require('net');
let EE = require('events');
let Client = require('./client.js');

let PORT = process.env.PORT || 3000;
let users = [];
let ee = new EE();

let server = net.createServer(function(client) {
  // console.log('client connected');
  // client.on('end', function() {
  //   console.log('client disconnected');
  //   // console.log(this);
  // });
});



ee.on('/all', function(user, string) { //works
  console.log('all event');
  users.forEach(u => {
    u.socket.write(user.nickName + ' : ' + string);
  });
});

ee.on('/nick', function(user, string) { //works
  console.log('string is ->  ' + string);
  user.nickName = string.trim();
  console.log('new nick is ' + user.nickName);
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

ee.on('default', function(user) { //works, should probably change though
  console.log('default event');
  user.socket.write('default: no command entered');
});

server.on('error', function(err) { //not sure
  console.log(err);
  console.log('server error');
});

server.on('connection', function(connection) {
  let user = new Client(connection);
  users.push(user);
  let index = users.indexOf(user);
  connection.on('end', function() {
    users.splice(index); //this may empty out the array sometimes
    users.forEach(function(u) {
      u.socket.write(user.nickName + ' has disconnected');
    });
    console.log(users);
  });

  connection.on('error', function(err) {
    console.log(err);
    console.log('client error event'); //replace later
  });

  connection.on('data', function(data) {
    let command = data.toString().split(' ').shift().trim();
    if (command.startsWith('/')) {
      ee.emit(command, user, data.toString().split(' ').slice(1).join(' '));
      return;
    }
    ee.emit('default', user, data.toString());
  });
});

server.listen(PORT, function() {
  console.log('listening on ' + PORT);
});