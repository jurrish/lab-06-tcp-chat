'use strict';

const assert = require('assert');
const server = require('../server.js');
const net = require('net');
const client = new net.Socket();

describe('a server module', function() {
  describe('data()', function() {
    beforeEach(function(done) {
      server.listen(3000);
      client.connect({port: 3000}, function() {
        done();
      });
    });
    afterEach(function(done) {
      client.end();
      server.close();
      done();
    });
    describe('\\nick', function() {
      it('should change a users nickname', function(done) {
        client.on('data', function(data) {
          console.log(data);
          assert.equal(data.toString(), client.socket.nickname);
          done();
        });
        client.write('\\nick Kyle');
      });
    });
  });
});
