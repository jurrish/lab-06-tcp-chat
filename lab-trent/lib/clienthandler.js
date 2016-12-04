'use strict';

const uuid = require('uuid/v4');

const clients = [];

function Client(conn) {
  this.nick = 'Guest#' + Math.floor(Math.random() * 99999);
  this.uuid = uuid();
  this.ip = conn.remoteAddress;
  this.socket = conn;
  conn.on('data', this.decode);
  conn.on('close', this.finish);
  conn.on('error', handleError);
  clients.push(this);
}

Client.prototype.decode = function(data) {
  let message = data.toString();
  if (message.startsWith('/')) {
    let args = message.split(' ');
    handleCommand(args[0], args.slice(1, args.length));
  } else {
    sendPublic(this.nick + ': ' + message);
  }
};

Client.prototype.finish = function() {
  sendPublic(this.nick + ' disconnected.');
  clients.slice(clients.indexOf(this));
};

function sendPublic(message) {
  clients.forEach(function(client) {
    client.socket.write(message);
  });
}

function handleCommand(command, args) {
  switch(command) {
  case '':
    break;
  }
}

function handleError(err) {
  console.log(err);
}

module.exports = {
  Client, clients
};
