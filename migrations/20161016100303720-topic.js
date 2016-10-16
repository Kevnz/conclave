
exports.up = function(knex, Promise) {
  return knex.schema.createTable('topics', function(table) {
    table.increments('id').primary();
    table.string('title');
    table.integer('created_by').unsigned().references('users.id');
    table.text('description');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('topics');
};
