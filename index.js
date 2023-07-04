const http = require('http');
const mongo = require('./config.js');

const port = 3000;

mongo.runConnection();

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, jazzer tester!');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
