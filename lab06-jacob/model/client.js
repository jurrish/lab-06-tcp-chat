const uuid = require('node-uuid');
//import the core node uuid module

const Client = module.exports = function(socket){
  this.socket = socket;
  this.nickname = `user_${Math.random()}`;
  this.id = uuid.v4();
};
//defines the client
