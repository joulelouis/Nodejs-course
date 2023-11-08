//1. Sign up a NodeJS driven server
const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    //2. Handle 2 routes: '/' and '/users'
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Assignment 1</title></head>')
        //3. Add a form with a "username" <input> to the '/' page and submit a POST request to '/create-user' upon a button click
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>')
        res.write('</html>');
        return res.end();
    }
    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Assignment 1</title></head>')
        res.write('<body><ul><li>User 1</li><li>User 2</li></ul></body>')
        res.write('</html>');
        return res.end();
    }
    // 4. Add a '/create-user' route and parse the incoming data and simply log it to the console
    if (url === '/create-user') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody.split('=')[1]); //username="whatever-content"
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }
});

server.listen(3000);