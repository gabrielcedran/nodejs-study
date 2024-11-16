import http from 'node:http';

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello from the server!')
})

server.listen(4000, () => {
    console.log("server running on port 4000");
});