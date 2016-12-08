'use strict';

const assert = require('assert');
const server = require('../server.js');
const net = require('net');

const client1 = new net.Socket();
const client2 = new net.Socket();
const client3 = new net.Socket();
const client4 = new net.Socket();

describe('a server module', function() {
  describe('data()', function() {

    before(function(done) {
      server.listen(3000);
      client1.connect({port: 3000}, function() {});
      client2.connect({port: 3000}, function() {});
      client3.connect({port: 3000}, function() {});
      client4.connect({port: 3000}, function() {});
      done();
    });
    after(function(done) {
      client1.end();
      client2.end();
      client3.end();
      client4.end();
      server.close();
      done();
    });

    describe('\\nick', function() {
      it('should change a users nickname', function(done) {
        client1.once('data', function(data) {
          assert.equal(data.toString(), 'You changed your nickname to Randy');
          done();
        });
        client1.write('\\nick Randy');
      });
    });
    describe('\\dm', function() {
      it('should direct message a specific user', function(done) {
        client2.once('data', function(data) {
          assert.equal(data.toString(), 'You private messaged three: Hello');
          done();
        });
        client3.write('\\nick three');
        client2.write('\\dm three Hello');
      });
    });
    describe('\\all', function() {
      it('should send a message to all connected users', function(done) {
        client4.once('data', function(data) {
          assert.equal(data.toString(), 'You messaged everyone: Hello');
          done();
        });
        client4.write('\\all Hello');
      });
    });
  });
});
