const users = require('../fixtures/users-fixture.json').users;
const topics = require('../fixtures/topics-fixture.json').topics;

const mappedUsers = users.map((user) => {
  const fixed = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.hashedPassword
  };
  return fixed;
});

exports.seed = function(knex) {
  return knex('users').del()
    .then(() => knex.batchInsert('users', mappedUsers))
    .then(() => knex.batchInsert('topics', topics))
    .then(() => {
      console.log('seed import done');
    });
};
