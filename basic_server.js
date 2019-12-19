// implement your API here
// server 2
const http = require('http');

const hostname = '127.0.0.1';
const port = 5000;

const server = http.createServer((req, res) => {
    console.log("ip:", req.connection.remoteAddress);
    res.statusCode = 200;
    res.setHeader("Content-Type", 'text/html');
    res.write("<html><body><h1>NodeJS Server 1</h1></body></html>")
    res.end();
});

server.listen(port, hostname, () => {
    console.log(`server listening on http://${hostname}: ${port}`);
});