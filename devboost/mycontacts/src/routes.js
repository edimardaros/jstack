const { Router } = require('express');

const ContactController = require('./app/controllers/ContactController');
const CategoryController = require('./app/controllers/CategoryController');

const router = Router();

router.get(
  '/contacts',
  (request, response, next) => { // middleware 1
    request.appId = 'MeuAppID';
    // response.send('Travado pelo middleware'); // Travar a requisição, não continuar para as rotas
    next(); // Chama o proximo middleware, o abaixo
  },
  ContactController.index, // middleware 2
);
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', ContactController.store);
router.put('/contacts/:id', ContactController.update);

router.get('/categories', CategoryController.index);
router.post('/categories', CategoryController.store);

module.exports = router;
