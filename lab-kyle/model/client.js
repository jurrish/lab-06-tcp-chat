'use strict';

const uuid = require('node-uuid');

const Client = function(socket) {
  this.socket = socket;
  this.nickname = `user_${Math.random()}`;
  this.id = uuid.v4();
};

module.exports = Client;
