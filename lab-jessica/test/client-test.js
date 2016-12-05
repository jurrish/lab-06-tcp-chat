const assert = require('assert');
const Client = require('../lib/client.js');

describe('Client Module', function() {
  describe('#Client', function() {
    it('creates new client', function() {
      const clientExists = function() {
        const client = new Client();
        if(client) {
          return true;
        }
      };
      assert.strictEqual(true, clientExists());
    });

    it('client has properties socket, nickname, and id', function() {
      const clientPropsExist = function() {
        const client = new Client();
        console.log(client);
        if(client.hasOwnProperty('socket') && client.hasOwnProperty('nickname') && client.hasOwnProperty('id')) {
          return true;
        }
      };
      assert.strictEqual(true, clientPropsExist());
    });

  });
});
