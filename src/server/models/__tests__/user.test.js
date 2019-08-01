const faker = require('faker')
const { InvalidPasswordError } = require('../../errors')
const User = require('../user')

const getUser = () => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()

  return {
    username: faker.internet.userName(firstName, lastName),
    firstName,
    lastName,
    email: faker.internet
      .email(firstName, lastName, 'testing.com')
      .toLowerCase(),
    password: faker.internet.password(),
  }
}
describe('The User Model', async () => {
  it('should match the snapshopt', async () => {
    const user = await User.where({ id: 1 }).fetch()
    const snapshotUser = user.toJSON()
    delete snapshotUser.created_at
    delete snapshotUser.updated_at
    delete snapshotUser.createdOn
    expect(snapshotUser).toMatchSnapshot()
  })
  it('should create a user', async () => {
    const u = getUser()
    const user = new User(u)
    const result = await user.save()
    expect(result).not.toBeNull()
  })
  it('should create a user and then update', async () => {
    const u = getUser()
    const user = new User(u)
    const result = await user.save()
    expect(result).not.toBeNull()
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
