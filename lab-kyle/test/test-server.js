'use strict';

const assert = require('assert');
const server = require('../server.js');

describe('a server module', function() {
  describe('data()', function() {
    it('should add a client to the client pool', function(done) {

      server.listen(3000);
      let pool= [];

      let client = net.connect({port: 3000}, function() {
        // do something?
      });

      // client.on('connection', function(socket) {
      //   let client = new Client(socket);
      //   pool.push(client);
      //   assert.equal(pool.length > 0, true);
      // });

      server.close();
      done();
    });
  });
});
