# About
This is a small and simple TCP chat server written in NodeJS. It supports nicknames, uuids, private messages, and broadcast events. There is also an example test client file inside that can be used to connect to the server and test the commands.

# Setting up
All you have to do to set up the project is clone the project, install the Node dependencies with 'npm install' and then run it.

# Connecting to the server
Connecting to the server is incredibly simple as it is 100% string based. All that is required to connect is starting up a TCP connection to the specified IP/Port. Then wherever you want the chat output written to, just parse and print any incoming data as a string to it. If you want to send anything to the server, just send the text as a bytebuffer to it and it will handle the rest.

There is an example of this located in the clienttest file.
