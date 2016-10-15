const argv = require('yargs').argv;
const to = require('to-case');
const writeFile = require('./utils/write-file');

const timestamp = require('./utils/timestamp')();
const migration = `
exports.up = function(knex, Promise) {

};

exports.down = function(knex, Promise) {

};
`;
const name = to.slug(argv._[0]);

const path = `./migrations/${timestamp}-${name}.js`;

writeFile(path, migration);
