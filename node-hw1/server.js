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

let port = 3000; 


process.argv.forEach(arg => {
  if (arg.startsWith('port=')) {
    const portArg = arg.split('=')[1];
    if (!isNaN(portArg)) {
      port = portArg;
    }
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`server is running at port ${port}`);
});
