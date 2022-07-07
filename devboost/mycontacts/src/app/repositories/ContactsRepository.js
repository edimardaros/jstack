const { uuid } = require('uuidv4');

const contacts = [
  {
    id: uuid(),
    name: 'Edimar',
    email: 'edimar@mail.com',
    phone: '9999999',
    category_id: uuid(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }
}

module.exports = new ContactsRepository();
