exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    return table.string('username').defaultTo('---')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    return table.dropColumn('username')
  })
}
