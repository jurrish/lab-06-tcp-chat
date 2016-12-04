'use strict';

const chatClient = require('../lib/chatClient');
const expect = require('chai').expect;

describe('this is my chatClient module', function () {
  describe('this is the client constructor', function () {
    it('should return a client object with the appropriate values', function () {
      let client = chatClient(1);
      expect(client).to.have.all.keys(['socket', 'nickname', 'id']);
      expect(client.socket).to.be.equal(1);
      expect(client.nickname).to.match(/[user_$]+[0-9]/);
      expect(client.id).to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    });
  });
});
