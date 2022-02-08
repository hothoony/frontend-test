var http = require('http');

function onRequest(request, response) {
    console.log(request, response);
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('hello world');
    response.end();
}

var server = http.createServer(onRequest);
server.listen(8080);
console.log('server ready');
