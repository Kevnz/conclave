const argv = require('yargs').argv;
const fs = require('fs');
const pluralize = require('pluralize');

// YYYYMMDDHHmmss

const now = new Date;
const year = now.getFullYear();
const month = now.getMonth() > 8 ? (now.getMonth() + 1).toString() : `0${(now.getMonth() + 1)}`;
const day = now.getDate() > 9 ? now.getDate().toString() : `0${now.getDate()}`;
const hour = now.getHours() > 8 ? (now.getHours() + 1).toString() : `0${(now.getHours() + 1)}`;
const minutes = now.getMinutes() > 8 ? (now.getMinutes() + 1).toString() : `0${(now.getMinutes() + 1)}`;
const seconds = now.getMinutes() > 8 ? (now.getMinutes() + 1).toString() : `0${(now.getMinutes() + 1)}`;
const milliseconds = now.getMilliseconds() > 8 ? (now.getMilliseconds() + 1).toString() : `0${(now.getMilliseconds() + 1)}`;
const timestamp = `${year}${month}${day}${hour}${minutes}${seconds}${milliseconds}`;


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
const writeFile = function writeFileToSystem(name, attributes) {
  const tableName = pluralize(name.toLowerCase());
  const formattedName = name.toLowerCase();
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
  fs.writeFileSync(fullMigrationPath, migration);
  fs.writeFileSync(fullModelPath, model);
  console.log(`created: ${fullMigrationPath}`);
  console.log(`created: ${fullModelPath}`);
};

const name = argv.name;
const attributes = argv._;


writeFile(name, attributes);
