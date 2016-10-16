const faker = require('faker');
const bcrypt = require('bcrypt');

module.exports = function (createdBy = 1) {
  return {
    title: faker.company.catchPhrase(),
    description: faker.company.bs(),
    created_by: createdBy
  };
};

