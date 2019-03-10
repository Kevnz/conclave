exports.up = function(knex, Promise) {
  return knex.schema
    .table('users', function(table) {
      return table.string('role').defaultTo('user')
    })
    .then(() => {
      return knex.schema.table('topics', function(table) {
        return table.integer('parent_id').references('topics.id')
      })
    })
}

exports.down = function(knex, Promise) {
  return knex.schema
    .table('users', function(table) {
      return table.dropColumn('role')
    })
    .then(() => {
      return knex.schema.table('topics', function(table) {
        return table.dropColumn('parent_id')
      })
    })
}
