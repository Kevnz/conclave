const users = require('../fixtures/users-fixture.json').users;
const topics = require('../fixtures/topics-fixture.json').topics;
const messages1 = require('../fixtures/messages-fixture-1.json').messages;
const messages2 = require('../fixtures/messages-fixture-2.json').messages;

const mappedUsers = users.map((user) => {
  const fixed = {
    first: user.first,
    last: user.last,
    email: user.email,
    password: user.hashedPassword
  };
  return fixed;
});

exports.seed = function dataImport(knex) {
  return knex('users').del()
    .then(() => knex.batchInsert('users', mappedUsers))
    .then(() => knex.batchInsert('topics', topics))
    .then(() => knex.batchInsert('messages', messages1))
    .then(() => knex.batchInsert('messages', messages2))
    .then(() => {
      console.log('seed import done');
    });
};
