const fs = require('fs');

const reqHandlers = (req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Node js page</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if(method === 'POST' && url === '/message'){
        const body = [];
        req.on('data', (chunk) => {
            console.log('Chunk' , chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log('ParsedBody', parsedBody);
            const message = parsedBody.split('=')[1];
            // fs.writeFileSync('message.txt', message);
            fs.writeFile('message.txt', message, (err) => {
                console.log('Written: ' + message);
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
      
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Node js page</title></head>');
    res.write('<body><h1>Writing from node server</h1></body>');
    res.write('</html>');
}

module.exports = reqHandlers;