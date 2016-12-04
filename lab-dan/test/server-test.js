'use strict';

const net = require('net');
const chatClient = require('../lib/chatClient');
const server = require('../server');
const expect = require('chai').expect;

describe('this is my server module', function() {
  let serverRunning = true;
  before(function(){
    server.start(chatClient);
  });
  describe('starting server', function () {
    it('should be running', function () {
      expect(serverRunning).to.be.true;
    });
  });
  describe('client sends message with no command', function (done) {
    it('should return an expected statement', function () {
      let testClient = net.connect({port: 3000}, function () {
        testClient.write('Test data with no command!');
      });
      testClient.on('data', function (data) {
        expect(data).to.be.equal('not a command');
        testClient.end();
        done();
      });
    });
  });
  describe('this is my function that changes nickname', function () {
    // bonus point if I can test this
  });
});
