const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    // Listar todos os registros
    // response.send('Sent from ContactController');
    const contacts = await ContactsRepository.findAll();

    response.json(contacts);
    // response.send(request.appId);
  }

  async show(request, response) {
    // Obter UM registro
    // response.json(request.params);
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: Not Found
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(contact);
  }

  async store(request, response) {
    // Criar novo registro
    // response.send(request.body);
    const { name, email, category_id } = request.body;
    const contactExists = await ContactsRepository.findByEmail(email);

    if (!name) {
      return response.status(400).json({ error: 'Name is required!' });
    }

    if (contactExists) {
      return response.status(400).json({ error: 'Email already exists!' });
    }

    const contact = await ContactsRepository.create({
      name, email, category_id,
    });

    response.json(contact);
  }

  update() {
    // Editar um Registro
  }

  async delete(request, response) {
    // Deletar um Registro
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: Not Found
      return response.status(404).json({ error: 'User not found' });
    }

    await ContactsRepository.delete(id);
    // 204: No Content
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
