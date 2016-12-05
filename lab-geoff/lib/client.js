'use strict';

let uuid = require('node-uuid');

module.exports = function(socket) {
  this.id = uuid.v4();
  this.nickName = 'guest-' + (Math.random());
  this.socket = socket;
};