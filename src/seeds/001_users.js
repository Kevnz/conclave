const users = require('../fixtures/users-fixture.json')

exports.seed = function(knex, Promise) {
  const dbReadyUsers = users.map(u => {
    const hashed = u.hashedPassword
    u.password = hashed
    delete u.hashedPassword
    return u
  })
  // Deletes ALL existing entries

  return knex('messages')
    .del()
    .then(() =>
      knex('topics')
        .del()
        .then(() =>
          knex('users')
            .del()
            .then(function() {
              // Inserts seed entries
              return knex('users').insert(dbReadyUsers)
            })
        )
    )
}
