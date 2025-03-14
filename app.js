const http = require('http');

const server = http.createServer((req, res) => {
    console.log('Request', req);
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Node js page</title></head>');
    res.write('<body><h1>Writing from node server</h1></body>');
    res.write('</html>');
});

server.listen(3000);