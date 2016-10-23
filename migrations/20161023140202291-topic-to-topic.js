
exports.up = function(knex) {
  return knex.schema.table('topics', function(table) {
    return table.integer('parent_id').unsigned().references('topics.id');
  });
};

exports.down = function(knex) {
  return knex.schema.table('topics', function(table) {
    return table.dropColumn('parent_id');
  });
};
