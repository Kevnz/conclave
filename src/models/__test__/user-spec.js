/* eslint-env node, mocha */

const assert = require('assert');
const fixtureUsers = require('../../../fixtures/users-fixture.json').users;
const User = require('../user');

describe('The User Model', () => {
  describe('the login function', () => {
    it('should return a user given a valid email and password', (done) => {
      const userToLogin = fixtureUsers[0];
      User.login(userToLogin.email, userToLogin.password)
        .then((user) => {
          assert(user.get('email') === userToLogin.email);
          console.log(user);
          done();
        });
    });
    it('should return an error given a valid email and invalid password', (done) => {
      const userToLogin = fixtureUsers[0];
      User.login(userToLogin.email, userToLogin.password)
        .then((user) => {
          assert(false);
          done();
        }).catch((err) => {
          assert(true);
          done();
        });
    });
  });
});
