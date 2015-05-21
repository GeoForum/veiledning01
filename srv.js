var connect = require('connect');
var serveStatic = require('serve-static');
var port = 9001;
console.log('Setting up server on http://localhost:' + port + '/');
connect().use(serveStatic(__dirname)).listen(port);
