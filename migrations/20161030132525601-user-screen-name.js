
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    return table.string('screen_name').defaultTo('---');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    return table.dropColumn('screen_name');
  });
};
