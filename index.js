const http = require('http');

const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello World');
});

/*server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/
server.listen(port)
console.log(`Server running at port ${port}`);