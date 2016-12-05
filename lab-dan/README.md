#Dan's Awesome Amazing TCP Chat Server
##:+1:Get Your Chat Served Up On A TCP Platter:+1:
###But it can only be text. None of these fancy cat GIFs. Come'on now.:cat:

###To-Do
- [x] Set-up file structure
- [x] Set-up tests for tcpchat library
  - [ ] Ensure all functions have test coverage
- [x] Set-up gulpfile
- [x] Create module
  - [x] Create a TCP Server use using the net module
  - [x] Create a Client Constructor
    - [x] When sockets connect to the server a new Client instance should be made
    - [x] Clients should have a unique id from node-uuid e.g. 2309-4802-3948-...
    - [x] Clients should have a unique 'nickname' e.g. guest-43
  - [ ] When sockets are connected with the ClientPool they should be given event listeners for data, error, and close events
    - [ ] When a socket emits the close event the socket should be removed from the client pool!
    - [ ] When a socket emits the error event the error should be logged on the server
    - [x] When a socket emits the data event the data should be logged on the server and the \wack commands below should be implemented
  - [x] Implement WACK commands
    - [x] \all should trigger a broadcast event
    - [x] \nick should allow a user change their nickname
    - [x] \dm should allow a user to send a message directly to another user by nick name
    - [ ] when a user speaks their nickname should be printed i.e. teapot: Sup Hacker?

###About My Project
This is a TCP chat server implementation. The biggest problem I have encountered is dealing with testing.
That aside, the server does work! You can run the server and then connect clients which
can send and receive data. Because this is a TCP server, the clients remain connected and
available to send and receive data over their assigned socket. Furthermore, each client
will be properly assigned a unique id and nickname (and the nickname can be changed if the user so chooses).

###How to Get This Damn Thing Running (if you know, would you tell me? jk...sorta)
You can start the server using ```node index.js```
The server will start listening for clients to connect, and also listens for any
events emitted when a client sends a message.

###How to Connect to the Server
If you are using the server in localhost, in a new tab in terminal and do the following command:
```nc 127.0.0.1 3000```
This will create a client. You can then send and receive data.
