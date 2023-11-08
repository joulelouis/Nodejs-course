const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>'); 
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        }); // event listener
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                // send response
                // this will execute once we're done writing the file
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            }); 
            
        }); // will be executed once it's done parsing the incoming requests data or the incoming data
        
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>'); // write some data to our response
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server</h1></body>')
    res.write('</html>');
    res.end(); //when done creating a response, will send back the response to the client
    //res.write() //this is not applicable and will cause an error
}

/*
module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
};
*/

exports.handler = requestHandler;
exports.someText = 'Some hard coded text';