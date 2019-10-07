const faker = require('faker')
const bcrypt = require('bcrypt')

module.exports = id => {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const password = 'password'
  const hashedPassword = bcrypt.hashSync(password, salt)
  const firstName = 'Admin'
  const lastName = 'User'
  return {
    id: id,
    firstName,
    lastName,
    email: 'admin@example.net',
    username: 'admin',
    role: 'admin',
    password,
    hashedPassword,
  }
}
