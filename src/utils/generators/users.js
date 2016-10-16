const faker = require('faker');
const bcrypt = require('bcrypt');

module.exports = function (role = 'user') {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const password = faker.internet.password();
  const hashedPassword = bcrypt.hashSync(password, salt);
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    role,
    password,
    hashedPassword
  };
};

