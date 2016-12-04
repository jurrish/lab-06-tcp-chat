'use strict';

const uuid = require('uuid/v4');

const clients = [];

function Client(conn) {
  this.nick = 'Guest#' + Math.floor(Math.random() * 99999);
  this.uuid = uuid();
  this.ip = conn.remoteAddress;
  this.socket = conn;
  conn.on('data', (data) => {
    this.decode(data);
  });
  conn.on('close', () => {
    clients.splice(clients.indexOf(this));
    sendPublic(this.nick + ' disconnected.', this.nick);
  });
  conn.on('error', handleError);
  clients.push(this);
}

Client.prototype.decode = function(data) {
  let message = data.toString();
  if (message.startsWith('/')) {
    let args = message.replace('/', '').split(' ');
    handleCommand(this, args[0], args.slice(1, args.length));
  } else {
    sendPublic(this.nick + ': ' + message);
  }
};

function nickExists(nick) {
  clients.forEach(function(client) {
    if (client.nick.toLowerCase() == nick.toLowerCase()) {
      return true;
    }
  });
  return false;
}

function getClientByNick(nick) {
  for (let i = 0;i < clients.length;i++) {
    if (clients[i] && clients[i].nick.toLowerCase() == nick.toLowerCase()) {
      return clients[i];
    }
  }
  return null;
}

function sendPublic(message, exclude) {
  clients.forEach(function(client) {
    if (client.nick != exclude)
      client.socket.write(message);
  });
}

function handleCommand(client, command, args) {
  switch(command) {
  case 'nick':
    if (nickExists(args[0])) {
      client.socket.write('Nickname is already being used at the moment.');
    } else {
      client.nick = args[0];
      client.socket.write('You changed your nickname to ' + args[0]);
    }
    break;
  case 'dm': {
    if (args[0].toLowerCase() == client.nick.toLowerCase()) {
      client.socket.write('How lonely are you to be dming yourself?');
      break;
    }
    let target = getClientByNick(args[0]);
    let message = '';
    for (let i = 1;i < args.length;i++) {
      message += args[i] + ((i >= args.length-1) ? '' : ' ');
    }
    if (target) {
      target.socket.write(client.nick + '->me: ' + message);
      client.socket.write('you->' + target.nick + ': ' + message);
    } else {
      client.socket.write('Couldn\'t find user by the name ' + args[0]);
    }
  }
    break;
  case 'all': {
    let message = '';
    for (let i = 0;i < args.length;i++) {
      message += args[i] + ((i >= args.length-1) ? '' : ' ');
    }
    sendPublic('Broadcast: ' + message);
  }
    break;
  }
}

function handleError(err) {
  if (err.code != 'ECONNRESET')
    console.log(err);
}

module.exports = {
  Client, clients
};
