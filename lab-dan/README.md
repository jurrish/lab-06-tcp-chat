#Dan's Awesome Amazing TCP Chat Server
##:+1:Get Your Chat Served Up On A TCP Platter:+1:
###But it can only be text. None of these fancy cat GIFs. Come'on now.:cat:

###To-Do
[x] Set-up file structure
[x] Set-up tests for tcpchat library
  [] Ensure all functions have test coverage
[x] Set-up gulpfile
[] Create module
  [] Create a TCP Server use using the net module
  [] Create a Client Constructor
    [] When sockets connect to the server a new Client instance should be made
    [] Clients should have a unique id from node-uuid e.g. 2309-4802-3948-...
    [] Clients should have a unique 'nickname' e.g. guest-43
  [] When sockets are connected with the ClientPool they should be given event listeners for data, error, and close events
    [] When a socket emits the close event the socket should be removed from the client pool!
    [] When a socket emits the error event the error should be logged on the server
    [] When a socket emits the data event the data should be logged on the server and the \wack commands below should be implemented
  [] Implement WACK commands
    [] \all should trigger a broadcast event
    [] \nick should allow a user change their nickname
    [] \dm should allow a user to send a message directly to another user by nick name
    [] when a user speaks their nickname should be printed i.e. teapot: Sup Hacker?

###About My Project

###How to Get This Damn Thing Running (if you know, would you tell me?)

###How to Connect to the Server
