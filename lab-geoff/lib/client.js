//create client constructor here
//unique id with node-uuid
'use strict';

let uuid = require('node-uuid');

function Client() {
  let arr = new Array(32);
  let id = uuid.unparse(uuid.v1(null, arr, 0));
  console.log(id);
  //uuid
  //nick name
}

Client();