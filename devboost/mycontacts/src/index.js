const express = require('express');

const routes = require('./routes');

const app = express();

app.use((request, response) => {
  // Middleware 1
  request.appId = 'MeuAppID';
  response.send('Travado pelo middleware'); // Travar a requisição, não continuar para as rotas
});

app.use(routes); // Middleware 2

app.listen(3000, () => console.log('Server started at http://localhost:3000'));
// Middleware 1 -> Middleware 2 -> Middleware 3 -> Middleware 4
