//test require server.js and net module.

const net = require('net');
const server = require('../server.js');
const assert = require('assert');

describe('Testing server.js', function() {

  describe('connection to the server', function() {
    before(function(done) {
      server.listen(3000);
      done();
    });
  });

  describe('testing nickname change', function() {
    it('should change nickname', function(done) {
      //change the name (/nick caro)
      //assert that nickname has been changed
      done();
    });
  });

});
