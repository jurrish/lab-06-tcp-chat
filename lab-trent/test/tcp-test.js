'use strict';

const assert = require('assert');
const net = require('net');
const client = new net.Socket();

require('../index');

describe('Client', function() {
  beforeEach(function(done) {
    client.connect( { host: '127.0.0.1', port: 43593 }, function() {
      done();
    });
  });

  afterEach(function(done) {
    client.destroy();
    done();
  });

  describe('Commands', function() {
    describe('/test', function() {
      it('should set the nickname of the Client to the specified name.', function(done) {
        client.once('data', function(data) {
          assert.equal(data.toString(), 'You changed your nickname to test');
          done();
        });
        client.write('/nick test');
      });
      it('should set the nickname of the Client to the specified name.', function(done) {
        client.once('data', function(data) {
          assert.equal(data.toString(), 'You changed your nickname to rick');
          done();
        });
        client.write('/nick rick');
      });
    });
    describe('/dm', function() {
      it('shouldn\'t find a user because we are the only one connected', function(done) {
        client.once('data', function(data) {
          assert.equal(data.toString(), 'Couldn\'t find user by the name bobby');
          done();
        });
        client.write('/dm bobby hi!');
      });
    });
    describe('/all', function() {
      it('should broadcast a message to everyone', function(done) {
        client.once('data', function(data) {
          assert.equal(data.toString(), 'Broadcast: hello everyone!');
          done();
        });
        client.write('/all hello everyone!');
      });
      it('should broadcast a message to everyone', function(done) {
        client.once('data', function(data) {
          assert.equal(data.toString(), 'Broadcast: hello everyone again!');
          done();
        });
        client.write('/all hello everyone again!');
      });
    });
  });
});
