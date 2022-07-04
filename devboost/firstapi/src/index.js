const http = require('http');
const { URL } = require('url');
const routes = require('./routes');

const server = http.createServer((request, response) => {
  // show parameters from request
  // true modify query response to object. From query: `'order=desc'` to `query: [Object: null prototype] { order: 'desc' },`
  // const parsedUrl = url.parse(request.url, true);   
  // console.log(parsedUrl);
  // const parsedUrl = new URL('http://localhost:3000/users?order=desc');
  // console.log(parsedUrl.searchParams.get('order')); // return this way, as a iterable:  `searchParams: URLSearchParams { 'order' => 'desc' }`
  // console.log(Object.fromEntries(parsedUrl.searchParams)); // convert iterable item to javascript object:   `{ order: 'desc' }`
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);

  console.log(`Resquest method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);

  const route = routes.find((routeObj) => (
    routeObj.endpoint === parsedUrl.pathname && routeObj.method === request.method
  ));

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams); // parsedUrl.query;
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