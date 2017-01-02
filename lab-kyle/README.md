# Lab-06 TCP-Server

This project uses a simple TCP server to allow multiple clients to connect to
the server that acts as a chat room. You can even direct message other users and
set your own nickname!

## Setup

To try this project out yourself, simply clone the repo down to your local machine.
You will also need to have node installed. Once both are in place simply run
*npm install* and your all set!

## Connecting to the TCP server

To connect to the server, use your terminal to navigate to the project repo and run
*node server.js*. This should get the server started. Now in another terminal window
you can connect to the server as a client using *telnet localhost 3000*. Crack open
a few client windows and you have a chat room simulation running in your terminal!

### Commands

All commands are pre-empted by two back slashes - \\

 + all - will send a message to everyone currently connected to the server

 + dm <nickname> - will send a message to a particular user with that nickname

 + nick <nickname> - will change that users nickname

 + quit - will quit the server for that client
