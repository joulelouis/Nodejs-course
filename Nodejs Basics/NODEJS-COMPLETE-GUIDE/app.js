/* THIS IS AN EXAMPLE OF A NODEJS SERVER */

// IMPORT http module
const http = require('http');
const routes = require('./routes');

//createServer callback function
// (req, res) => {...} is an incoming request listener
const server = http.createServer(routes.handler, routes.someText);

server.listen(3000);