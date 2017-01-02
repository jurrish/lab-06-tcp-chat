const expect = require('chai').expect;
const server = require('../server');
const net = require('net');

describe('My Server', function () {
  before(function(done) {
    server.listen(3000);
    console.log('server is listening on port 3000');
    done();
  });
  describe('the "all" shell command', function() {
    let client;
    let client2;
    before(function(done) {
      client = net.createConnection({port: 3000});
      client2 = net.createConnection({port: 3000});
      done();
    });
    it('should send a message', function(done) {
      client.once('data', function(data) {
        var name = data.toString().split(' ').pop().trim();
        expect(name).to.deep.equal('jacob');
        done();
      });
      client.write('\\all jacob');
    });
    it('should send a message to multiple users', function(done) {
      client2.once('data', function(data) {
        var name = data.toString().split(' ').pop().trim();
        expect(name).to.deep.equal('jacob');
        done();
      });
    });
    describe('the "dm" shell command', function() {
      it('should send a message directly to a user', function(done) {
        client2.once('data', function(data) {
          let message = data.toString().split(' ').slice(1).join(' ').trim();
          expect (message).to.deep.equal('what a beautiful test!');
          done();
        });
        client2.write('\\nick jacob'); //assign a name to second client
        client.write('\\dm jacob what a beautiful test!'); //send the other client a direct message. Test passes and also fails when it should
      });
    });
    describe('the "nick" shell command', function() {
      it('should assign a name to the client that runs the command', function(done) {
        client.once('data', function(data) {
          let nickname = data.toString().split(' ').pop().trim();
          console.log(nickname);
          expect(nickname).to.deep.equal('jimbob');
          done();
        });
        client.write('\\nick jimbob'); //test passes when it should and fails when it should
      });
    });
  });
});


//before done server.listen makes it so that is a condition for future describe statements
