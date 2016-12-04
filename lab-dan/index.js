'use strict';

const server = require('./server');
const chatClient = require('./lib/chatClient');

console.log('this is my index file');
console.log(server);

server.start(chatClient, function () {
  console.log(server);
});
