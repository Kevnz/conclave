const topics = require('../fixtures/topics-fixture.json')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('topics')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('topics').insert(topics)
    })
}
