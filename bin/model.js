const argv = require('yargs').argv;

const pluralize = require('pluralize');
const to = require('to-case');

const timestamp = require('./utils/timestamp')();
const writeFile = require('./utils/write-file');
const getDBType = function (dbType) {
  switch (dbType) {
    case 'string':
      return 'string';
    case 'int':
      return 'integer';
    case 'bigint':
      return 'bigInteger';
    case 'text':
      return 'text';
    case 'date':
      return 'date';
    case 'datetime':
      return 'dateTime';
    default:
      return 'string';
  }
};
const writeFiles = function writeFileToSystem(name, attributes) {
  const dbFriendly = to.snake(name).toLowerCase();
  const tableName = pluralize(dbFriendly);
  const formattedName = to.camel(name);
  const model = `
const bookshelf = require('./bookshelf');

module.exports = bookshelf.model('${name}', {
  tableName: '${tableName}',
  idAttribute: 'id'
});
`;
  let modelAttributes = '';
  for (let i = 0; i < attributes.length; i++) {
    console.log(attributes[i].split(':'));

    const [attrName, type] = attributes[i].split(':');
    const tab = i === 0 ? '' : '    ';
    modelAttributes += `${tab}table.${getDBType(type)}('${attrName}');\n`;
  }
  const migration = `
exports.up = function(knex, Promise) {
  return knex.schema.createTable('${tableName}', function(table) {
    table.increments('id').primary();
    ${modelAttributes}    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('${tableName}');
};
`;

  const fullMigrationPath = `./migrations/${timestamp}-${formattedName}.js`;
  const fullModelPath = `./src/models/${formattedName}.js`;
  writeFile(fullMigrationPath, migration);
  writeFile(fullModelPath, model);
  console.log(`created: ${fullMigrationPath}`);
  console.log(`created: ${fullModelPath}`);
};

const name = argv.name;
const attributes = argv._;


writeFiles(name, attributes);
