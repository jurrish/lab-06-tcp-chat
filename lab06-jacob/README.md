This app functions as a simple TCP chat server.

client.js exports an object which defines an object which acts as the identity of the individual client accessing the server. Each client has three identifying properties: the socket to which they connect, their nickname, and their unique ID.

The server.js file provides the means by which we start up the server and define the commands which can create and alter data in the server as well as return a response in certain cases. each command for this app starts with a backslash. The 3 main commands are /nick, /dm, and /all. The /nick command takes one argument which is the assignment of a nickname of the client making the command. The /all command takes one argument which is a string message to all other clients connected to the server at that time. The /dm command takes two arguments: the username/nickname of a user to where the message should go and the message contents itself in the form of a string.

To get the project running, clone this this repo into your project directory, and on your command line type in "node server.js" which should start the server. Once the server has started, then open a command line tab and type in "nc localhost 3000". In this case 3000 is just the port I chose so you can chose whichever port you want. 
