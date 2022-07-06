class ContactController {
  index(request, response) {
    response.send('Sent from ContactController');
    // Listar todos os registros
  }

  show() {
    // Obter UM registro
  }

  store() {
    // Criar novo registro
  }

  update() {
    // Editar um Registro
  }

  delete() {
    // Deletar um Registro
  }
}

module.exports = new ContactController();
