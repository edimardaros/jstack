const UserController = require('./controllers/UserController');

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: UserController.listUsers,
  },
  {
    endpoint: '/users/:id', // :id is a placeholders
    method: 'GET',
    handler: UserController.getUserById,
  },
  {
    endpoint: '/users', 
    method: 'POST',
    handler: UserController.createUser,
  },
  
  {
    endpoint: '/produtos',
    method: 'GET',
    handler: UserController.createUser,
  },

  

];