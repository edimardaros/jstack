const express = require('express');
require('express-async-error');

const routes = require('./routes');

const app = express();

app.use(express.json()); // Middleware do express usado no post
app.use(routes); // Middleware 2

// Manipulador de erros, sempre que der um erro ele trata todos somente aqui.
// para o express saber que é um Handler, precisa ter 4 argumentos
app.use((error, request, response, next) => {
  console.log('### Error Handler');
  console.log(error);
  response.sendStatus(500);
});

app.listen(3000, () => console.log('Server started at http://localhost:3000'));
// Middleware 1 -> Middleware 2 -> Middleware 3 -> Middleware 4
