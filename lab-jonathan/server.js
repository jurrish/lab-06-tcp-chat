'use strict';

//node modules
let net = require('net');
let EE = require('events');

//npm modules
//app modules
let Client = require('./model/client.js');

//env vars
let PORT = process.env.PORT || 3000;

//modlue constants
let pool = [];
let server = module.exports = net.createServer();
let ee = new EE();

ee.on('\\nick', nickname);

function nickname(client, string) {
  return client.nickname = string.trim();
}
exports.nickname = nickname;

ee.on('\\dm', direct);

direct = function(client, string){
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join(' ').trim();

  pool.forEach( c => {
    if(c.nickname === nickname){
      c.socket.write(`${client.nickname}: ${message}`);
    }
  });
};

ee.on('\\all', function(client, string){
  results = everyone(pool, string);
  pool.forEach( c => {
    c.socket.write(results[i]);
  },i);
});

everyone = function(pool, string){
  pool.map(c => {
    return `${client.nickname}: ${string}`;
  });

  module.exports.everyone = everyone;

ee.on('default', function(client, string){
  client.socket.write('not a command');
});

ee.on('\\error', function(client){
  client.socket.emit('error', 'This is an error!');
});

//modlue logic
server.on('connection', function(socket){
  let client = new Client(socket);
  pool.push(client);
  console.log('we are connected!!');
  socket.on('data', function(data) {
    let command = data.toString().split(' ').shift().trim();

    if(command.startsWith('\\')) {
      ee.emit(command, client, data.toString().split(' ').slice(1).join(' '));
      return;
    }

    ee.emit('default', client, data.toString());
  });

//listen for a close
  socket.on('close', function(){
    let clientIndex = pool.indexOf(client);
    pool.splice(clientIndex, 1);
    socket.destroy();
    console.log('removed the client and destroyed the socket');
    console.log(socket.destroyed);
  });

//listen for error on a socket
  socket.on('error', function(error){
    console.log(error);
  });






});




server.listen(PORT, function(){
  console.log('server running on port', PORT);
});
