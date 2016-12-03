'use strict'

const net = require('net');
const EE = require('events');
const Client = require('client');
const fs = require('fs');
const uuid = require('node-uuid');

//setup server
const server = net.createServer();
const client = new Client();
const pool = []; //pool of clients on socket
//emit something on connect

//create a new client everytime someone connects
//
