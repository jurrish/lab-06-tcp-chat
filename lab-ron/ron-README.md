TCP Chat Server:

This is a program that will allow for users to chat using a local host connection. One computer/terminal-window will run the server.js file, thereby creating the connecting point, through which other users will connect to one another.

Running TCP Chat Server:

First navigate into the server file, then use the command: 'node server.js' to start the server on port 3000. Now a user can connect to the server by using the command: 'telnet localhost 3000'. After being connected the user has a few options to communicate with other users.

\nick: this command will allow you to enter a nickname to be identified by from then on, like this: '\nick Bob'.

\dm: followed by a user name this command will allow you to send a private message.

\all: this command will broadcast to all of the users connected.

\close: this command will remove a user from the user pool, example; '\delete Joe'.
