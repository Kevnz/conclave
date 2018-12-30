exports.up = function(knex, Promise) {
  return knex.schema.createTable('topics', function(table) {
    table.increments('id').primary()
    table.string('title')
    table.text('description')
    table.integer('created_by').references('users.id')
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('topics')
}
