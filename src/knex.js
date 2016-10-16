const config = require('xtconf')();
const knex = require('knex')(config.get('database-connection'));

module.exports = knex;
