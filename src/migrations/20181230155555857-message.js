exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', function(table) {
    table.increments('id').primary()
    table.string('title')
    table.text('body')
    table.integer('topic_id').references('topics.id')
    table.integer('parent_id').references('messages.id')
    table.integer('created_by').references('users.id')
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages')
}
