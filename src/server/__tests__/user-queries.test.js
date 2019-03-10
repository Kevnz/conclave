const faker = require('faker')
const setupServer = require('../server')
const { getToken } = require('../utils/auth')

const User = require('../models/user')

const getUser = () => {
  const firstName= faker.name.firstName()
  const lastName = faker.name.lastName()
  return {
    firstName,
    lastName,
    username: faker.internet.userName(firstName, lastName).toLowerCase(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
  }
}

let server
describe('The Server GraphQL responses', () => {
  beforeAll(async () => {
    server = await setupServer()
    await server.start()
  })
  afterAll(async () => {
    await server.stop({ timeout: 100 })
  })

  it('should create a user', async () => {
    const firstName= faker.name.firstName()
    const lastName = faker.name.lastName()
    const query = {
      operationName: 'Signup',
      variables: {
        newUserInput: {
          firstName,
          lastName,
          username: faker.internet.userName(firstName, lastName).toLowerCase(),
          email: faker.internet.email().toLowerCase(),
          password: faker.internet.password(),
        },
      },
      query: `mutation Signup($newUserInput: NewUserInput!) {
        signup(newUserInput: $newUserInput) {
          token
        }
      }`,
    }
    const injectOptions = {
      method: 'POST',
      url: '/graphql',
      payload: JSON.stringify(query),
    }
    const response = await server.inject(injectOptions)
    console.log('response', response.payload)
    const data = JSON.parse(response.payload).data
    console.log('data', data)
    expect(data.signup.token).not.toBeNull()
  })
  it('should let a user login', async () => {
    const newUser = getUser()
    const user = await User.register(newUser)
    const query = {
      operationName: 'Login',
      variables: {
        loginInput: {
          email: user.get('email'),
          password: newUser.password,
        },
      },
      query:
        'mutation Login($loginInput: LoginInput! ) {\n  login(loginInput: $loginInput) {\n    token\n  }\n}\n',
    }

    const injectOptions = {
      method: 'POST',
      url: '/graphql',
      payload: JSON.stringify(query),
    }
    const response = await server.inject(injectOptions)

    const data = JSON.parse(response.payload).data
    expect(data.login.token).not.toBeNull()
  })
  it('should get a user from auth header', async () => {
    const newUser = getUser()
    const user = await User.register(newUser)
    const token = getToken(user.id)

    const query = {
      operationName: null,
      variables: {},
      query: '{\n  user {\n    email\n  }\n}\n',
    }

    const injectOptions = {
      method: 'POST',
      url: '/graphql',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      payload: JSON.stringify(query),
    }
    const response = await server.inject(injectOptions)
    const data = JSON.parse(response.payload).data
    expect(data.user.email).not.toBeNull()
  })
  it('should get a user from auth header but only one time', async () => {
    const newUser = getUser()
    const user = await User.register(newUser)
    const token = getToken(user.id)

    const query = {
      operationName: null,
      variables: {},
      query: '{\n  user {\n    email\n  }\n}\n',
    }

    const injectOptions = {
      method: 'POST',
      url: '/graphql',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      payload: JSON.stringify(query),
    }
    const response = await server.inject(injectOptions)
    const data = JSON.parse(response.payload).data
    expect(data.user.email).not.toBeNull()
    expect(data.user.email).toBe(newUser.email)
    const response2 = await server.inject(injectOptions)
    const data2 = JSON.parse(response2.payload).data
    expect(data2.user.email).toBe(data.user.email)
    expect(data2.user.email).toBe(newUser.email)
  })
})
