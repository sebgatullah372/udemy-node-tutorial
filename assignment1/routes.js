
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    const users = [];
    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Home page</title></head>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"/><button type="submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/users'){
        
        res.write('<html>');
        res.write('<head><title>Home page</title></head>');
        res.write('<body><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></body>');
        res.write('</html>');
        return res.end();
    }

    if(url === '/create-user' && method === 'POST'){
        const body = [];
        req.on('data' , (chunk) => {
            body.push(chunk);
        });

        return req.on('end', ()=> {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            users.push(username);
            console.log('users' , users);
            console.log(username);
            res.statusCode = 302;
            res.setHeader('Location', '/')
            return res.end();
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Node js page</title></head>');
    res.write('<body><h1>Writing from node server</h1></body>');
    res.write('</html>');
}

module.exports = requestHandler;