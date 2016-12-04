'use strict';

const net = require('net');
const chatClient = require('../lib/chatClient');
const server = require('../server');
const expect = require('chai').expect;

console.log(server);

describe('this is my chatClient module', function () {
  describe('this is the client constructor', function () {
    it('should return a client object with the appropriate values', function () {
      let client = chatClient(1);
      console.log(client);
      expect(client).to.have.all.keys(['socket', 'nickname', 'id']);
      expect(client.socket).to.be.equal(1);
      expect(client.nickname).to.match(/[user_$]+[0-9]/);
      expect(client.id).to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    });
  });
});

describe('this is my server', function() {
  before(function(done){
    server.start(chatClient, done);
  });
  describe('server should be running', function () {
    expect(server.listening).to.be.true;
  });
  // describe('it should send the default message', function (done) {
  //   let testClient = net.connect({port: 3000}, function () {
  //     testClient.write('Test data with no command!');
  //   });
  //   testClient.on('data', function (data) {
  //     expect(data).to.be.equal('not a command');
  //     testClient.end();
  //     done();
  //   });
  // });
  // describe('this is my function that changes nickname', function () {
  //   // bonus point if I can test this
  // });
});
