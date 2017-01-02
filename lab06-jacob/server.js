// node modules
const net = require('net');
//the node net module contains functions for creating both servers and clients
const EE = require('events');
//require the event module

// npm modules
// app modules
const Client = require('./model/client.js');

// env vars
const PORT = process.env.PORT || 3000;

// module constats
const pool = []; //empty array
const server = module.exports = net.createServer(); //creates the server and assigns it to a variable
const ee = new EE(); // creates variable that defines the event object.

ee.on('\\nick', function(client, string){
  client.nickname = string.trim();
  client.socket.write(client.nickname); //returns string stripped of any whitespace
});

ee.on('\\dm', function(client, string){
  console.log(string);//When you do something like /dm hi bert, the logged string will be 'bert hi bert'.
  let nickname = string.split(' ').shift().trim(); //define the part of the string that will be assigned to 'nickname'
  let message = string.split(' ').slice(1).join(' ').trim();
  //define the part of the string that will be assigned to 'message'.

  pool.forEach( c => { //for each user in the pool of users
    if (c.nickname === nickname){
      c.socket.write(`${client.nickname}: ${message}`);
    }
  });
});

ee.on('error', (err) => {
  throw err;
}); //error handling to catch any error that is emitted and say what it is.

ee.on('\\all', function(client, string){
  pool.forEach( c => {
    c.socket.write(`${client.nickname}: ` + string);
  });
});

ee.on('default', function(client, string) {
  console.log('not a command');
  ee.emit('error', new Error('not a command'));
}); //default event for if you write a bogus command that isn't a defined here


/// module logic
server.on('connection', function(socket){
  var client = new Client(socket);
  pool.push(client);
  // console.log(pool); //check the pool of users. pool successfully logs
  socket.on('data', function(data) {
    const command = data.toString().split(' ').shift().trim();

    if (command.startsWith('\\')) { //this makes it possible to create custom commands. It takes the data from the command, puts it into a string, and then runs a bunch of string/array methods to make the app recognize the command as the word you are writing. The various commands are defined above
      ee.emit(command, client, data.toString().split(' ').slice(1).join(' '));
      return;
    }

    ee.emit('default', client, data.toString());
    //if the command doesn't start with two backslashes

  });
  socket.on('error', function(error) {
    ee.emit('error', new Error(error));
  });
  socket.on('close', function(){
    socket.destroy();
    console.log('socket is destroyed: ' + socket.destroyed);
  });
});
//The client arg is passed in these functions so that messages and responses will be returned to the user (client) who is making the requests.


server.listen(PORT, function(){
  console.log('server running on port', PORT);
});
