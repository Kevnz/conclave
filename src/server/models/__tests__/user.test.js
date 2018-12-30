const faker = require('faker')
const { InvalidPasswordError } = require('../../errors')
const User = require('../user')

const getUser = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
  }
}
describe('The User Model', async () => {
  it('should create a user', async () => {
    const user = new User(getUser())
    const result = await user.save()
    expect(result).not.toBeNull()
  })
  it('should create a user and then update', async () => {
    const user = new User(getUser())
    const result = await user.save()
    expect(result).not.toBeNull()
    user.set('firstName', 'Deuce')
    const result2 = await user.save(null, { method: 'update' })
    expect(result2).not.toBeNull()
  })
  it('should create a user and then update', async () => {
    const newUser = getUser()

    const user = await User.register(newUser)

    expect(user).not.toBeNull()
    user.set('firstName', 'Deuce')
    const result2 = await user.save(null, { method: 'update' })
    expect(result2).not.toBeNull()
  })
  it('should create a user and then allow login', async () => {
    const newUser = getUser()
    const user = await User.register(newUser)
    expect(user).not.toBeNull()
    const login = await User.login(newUser.email, newUser.password)
    expect(login).not.toBeNull()
  })
  it('should throw an invalid password error with an invalid password when login is called', async () => {
    const newUser = getUser()
    const user = await User.register(newUser)
    expect(user).not.toBeNull()

    expect(
      User.login(newUser.email, 'This is an incorrect password')
    ).rejects.toThrow(InvalidPasswordError)
  })
})
