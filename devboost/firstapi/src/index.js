const http = require('http');
const url = require('url');
const routes = require('./routes');

const server = http.createServer((request, response) => {
  // show parameters from request
  // true modify query response to object. From query: `'order=desc'` to `query: [Object: null prototype] { order: 'desc' },`
  const parsedUrl = url.parse(request.url, true);   
  // console.log(parsedUrl);

  console.log(`Resquest method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);

  const route = routes.find((routeObj) => (
    routeObj.endpoint === parsedUrl.pathname && routeObj.method === request.method
  ));

  if (route) {
    request.query = parsedUrl.query;
    route.handler(request, response);
  } else {
      response.writeHead(404, {'Content-Type': 'text/html'});
      response.end(`Cannot ${request.method}  ${parsedUrl.pathname}`);
  }

  // if (request.url == '/users' && request.method == 'GET') {
  //   UserController.listUsers(request, response);
  // } else {
  //   response.writeHead(404, {'Content-Type': 'text/html'});
  //   response.end(`Cannot ${request.method}  ${request.url}`);
  // }

  
});

server.listen(3000, () => console.log('Server started at http://localhost:3000/'))