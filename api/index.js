const http = require('http');

const app = require('./src/server');

const server = http.createServer(app);

server.listen(3003, err => {
  if (err) console.log('error starting server', err);
  console.log('server running on port', 3003);
});
