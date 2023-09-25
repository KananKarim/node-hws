import http from 'http';

let requestCount = 0;

const server = http.createServer((req, res) => {
  requestCount += 1;
  res.writeHead(200, {
    'Content-type': 'application/json',
  });
  res.end(JSON.stringify({
    message: 'Request handled successfully',
    requestCount,
  }));
});

const port = process.argv[2] ? process.argv[2].split('=')[1] : 3000;

server.listen(port, '127.0.0.1', () => {
  console.log(`server is running at port ${port}`);
});
