'use strict';

const uuid = require('node-uuid');

// this module exports a client constructor
// which creates the necessary components for each client
// who connects to the server and is added to the pool
// mirrored the example given in Node docs: https://nodejs.org/api/modules.html
module.exports = (socket) => {
  return {
    socket: socket,
    nickname: `user_${Math.random()*Math.pow(10, 17)}`,
    id: uuid.v4()
  };
};
