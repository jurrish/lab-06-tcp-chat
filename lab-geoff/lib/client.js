//create client constructor here
//unique id with node-uuid
'use strict';

let uuid = require('node-uuid');

let Client = module.exports = function() {
  this.id = uuid.v4();
  this.nickName = 'guest-' + (Math.random());
};

let person = new Client();
console.log(person);