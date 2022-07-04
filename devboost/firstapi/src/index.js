const http = require('http');
const { URL } = require('url');
const routes = require('./routes');

const bodyParser = require('./helpers/bodyParser');

const server = http.createServer((request, response) => {
  // show parameters from request
  // true modify query response to object. From query: `'order=desc'` to `query: [Object: null prototype] { order: 'desc' },`
  // const parsedUrl = url.parse(request.url, true);   
  // console.log(parsedUrl);
  // const parsedUrl = new URL('http://localhost:3000/users?order=desc');
  // console.log(parsedUrl.searchParams.get('order')); // return this way, as a iterable:  `searchParams: URLSearchParams { 'order' => 'desc' }`
  // console.log(Object.fromEntries(parsedUrl.searchParams)); // convert iterable item to javascript object:   `{ order: 'desc' }`
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);

  let { pathname } = parsedUrl;
  let id = null;

  // const splitEndpoint = pathname.split('/'); // [ '', 'users', '3' ]
  // console.log(splitEndpoint); // [ '', 'users', '3' ]
  // const splitEndpoint = pathname.split('/').filter((routeItem) => Boolean(routeItem)); // remove empty values from array
  // console.log(splitEndpoint); // [ 'users', '3' ]
  const splitEndpoint = pathname.split('/').filter(Boolean); // remove empty values from array
  // console.log(splitEndpoint); // [ 'users', '3' ]

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }

  console.log(`Resquest method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);

  const route = routes.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === request.method
  ));

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams); // parsedUrl.query;
    request.params = { id };

    response.send =  (statusCode, body) => {
      response.writeHead(statusCode, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(body));
    }

    // if (request.method === 'POST' || request.method === 'PUT') {
    if (['POST','PUT', 'PATCH'].includes(request.method)) {
      bodyParser(request, () => route.handler(request, response)); // () => route.handler(request, response) é o callBack da bodyParser
    } else {
      route.handler(request, response);
    }
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