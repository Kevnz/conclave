const mysql = require('mysql');
const config = require('xtconf')();
const knex = require('../knex');

const dbConfig = config.get('database-connection').connection;

const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password
});
connection.connect();
const drop = `DROP DATABASE \`${dbConfig.database}\`;`;
const add = `CREATE SCHEMA \`${dbConfig.database}\`;`;

connection.query(drop, (err) => {
  if (err) throw err;
  connection.query(add, (err2) => {
    if (err2) throw err;
    knex.migrate.latest()
    .then(() => knex.seed.run())
    .then(() => {
      process.exit(0);
    })
    .catch((migrationError) => {
      console.log(migrationError);
      connection.end();
      process.exit(0);
    });
  });
});
