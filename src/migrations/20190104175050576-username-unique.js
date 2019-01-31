exports.up = knex => knex.schema.alterTable('users', t => t.unique('username'))

exports.down = knex =>
  knex.schema.alterTable('users', t => t.dropUnique('username'))
