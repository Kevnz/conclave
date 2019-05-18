const faker = require('faker')
const bcrypt = require('bcrypt')

module.exports = (id, role = 'user') => {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const password = faker.internet.password()
  const hashedPassword = bcrypt.hashSync(password, salt)
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  return {
    id: id,
    firstName,
    lastName,
    email: faker.internet
      .email(firstName, lastName, 'example.com')
      .toLowerCase(),
    username: faker.internet.userName(firstName, lastName).toLowerCase(),
    role,
    password,
    hashedPassword,
  }
}
