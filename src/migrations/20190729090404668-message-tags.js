exports.up = function(knex) {
  return knex.schema.table('messages', function(table) {
    return table.json('tag').defaultTo([])
  })
}

exports.down = function(knex) {
  return knex.schema.table('messages', function(table) {
    return table.dropColumn('tag')
  })
}
