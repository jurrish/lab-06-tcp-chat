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
  conn.on('error', handleError)
  clients.push(this);
}

Client.prototype.decode = function(data) {

};

Client.prototype.finish = function() {

};

function handleError(err) {
  console.log(err);
}

module.exports = {
  Client, clients
};
