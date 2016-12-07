let server = require('server.js');
let net = require('net');
var assert = require('chai').assert;

let nickname = require('server.js').nickname;
//test server starts
describe('test the server connection', function(){
  before(function() {
    server.listen(3000);
  });
  describe('server behavior', function(){
    before(function(done){
      let client;
      client = net.createConnection({port: 3000});
      done();
    })
    it('should start', function(done){
      console.log('it started!' + client);
      done();
    })
  })
  //client stuff
  describe('a client should be created', function(){
    before(function(){

    });
    describe('client behavior', function(){
      it('should be able to send a message to a single user', function(done){
        expect(direct("hello").to.equal('hello'));
        })
        done();
      })
      it('should post a message to everyone', function(done){
        expect(everyone([{nickname: 'bob'}, {nickname: 'carol'}], 'hello').to.equal([
          'bob: hello',
          'carol: hello'
        ])
        done();
      })
      it('should allow a user to change a nickname', function(done){
        expect(nickname("buddy").to.equal('buddy'));
        done();
      }
      //client after
      after(function(){
        //i don't know what to put here.  
      })
    })
    //server after
    after(function(){
      server.close();
    })

  });
