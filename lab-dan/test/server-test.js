'use strict';

const server = require('../server');
const net = require('net');
const expect = require('chai').expect;
const chatClient = require('../lib/chatClient');

describe('this is my server module', function() {
  let currentServer = undefined;
  before(function(done){
    server.start(chatClient, function(server) {
      currentServer = server;
      done();
    });
  });
  describe('starting server', function () {
    it('should be running', function () {
      expect(currentServer.listening).to.be.true;
    });
  });
  describe('client sends message with no command', function () {
    it('should return error message', function (done) {
      let testClient = net.connect({port: 3000}, function () {
        testClient.write('Test');
        testClient.on('data', function (data) {
          expect(data.toString()).to.be.equal('not a command');
          done();
        });
      });
    });
  });
  describe('client sends \\all message with "test"', function () {
    it('should return test message', function (done) {
      let testClient = net.connect({port: 3000}, function () {
        testClient.write('\\\\all test');
        testClient.on('data', function (data) {
          expect(data.toString()).to.contain('test');
          testClient.end();
          done();
        });
      });
    });
  });
  describe('this is my function that changes nickname', function () {
    // bonus point if I can test this
  });
  after(function(){
    currentServer.close();
  });
});
