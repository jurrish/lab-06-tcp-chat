'use strict';

const server = require('./server');
const chatClient = require('./lib/chatClient');

server.start(chatClient);
