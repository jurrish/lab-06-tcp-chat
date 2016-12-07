'use strict';

let uuid = require('node-uuid');

let Client = module.exports = function(socket){
  this.socket = socket;
  this.nickname = `user_${Math.random()}`;
  this.id = uuid.v4();
};
