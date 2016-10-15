
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    return table.string('role').defaultTo('user');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    return table.dropColumn('role');
  });
};
