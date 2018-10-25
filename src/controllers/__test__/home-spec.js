/* eslint-env node, mocha */
const request = require('supertest')
const assert = require('assert')
const faker = require('faker')
const app = require('../../server')
const User = require('../../models/user')

describe('The Home Controller', () => {
  it('should register a new user', done => {
    const email = faker.internet.email()
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    request(app)
      .post('/register')
      .send({ email, firstName, lastName, password: 'password' })
      .expect(304)
      .end((err, res) => {
        assert.ok(res.header.location === '/login')
        done()
      })
  })
  it('should allow a user to login', done => {
    const email = faker.internet.email()
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const password = 'password'
    User.register(firstName, lastName, email, password)
      .then(() => {
        request(app)
          .post('/login')
          .send({ email, password: 'password' })
          .expect(304)
          .end((err2, res2) => {
            assert.ok(
              res2.header.location.indexOf('/') > -1,
              'The location is wrong'
            )
            done()
          })
      })
      .catch(() => {
        assert(false)
      })
  })
  it('should not allow a user to login with wrong password', done => {
    const email = faker.internet.email()
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const password = 'password'
    User.register(firstName, lastName, email, password)
      .then(() => {
        request(app)
          .post('/login')
          .send({ email, password: 'passwordx' })
          .expect(304)
          .end((err2, res2) => {
            assert.ok(res2.header.location === '/login')
            done()
          })
      })
      .catch(() => {
        assert(false)
      })
  })
})
