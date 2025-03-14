const http = require('http');
console.log('here ');
const server = http.createServer((req, res) => {
    console.log('Request', req);
});

server.listen(3000);