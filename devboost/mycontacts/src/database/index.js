const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'docker',
  database: 'mycontacts',
});

client.connect();

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};

// Query('SELECT * FROM contacts;').then(console.log);
// client.query('SELECT * FROM contacts;').then(console.log)
// client.query('SELECT * FROM contacts;').then(result => console.log(result))
