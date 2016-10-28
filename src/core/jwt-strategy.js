const passportJWT = require('passport-jwt');
const User = require('../models/user');
const config = require('xtconf')();

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;


const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeader();
options.secretOrKey = config.get('auth-secret');

const strategy = new JwtStrategy(options, (payload, next) => {
  console.log('payload', payload);

  new User({ id: payload.id })
    .then((user) => {
      next(null, user);
    })
    .catch((err) => {
      next(err, false);
    });
});

module.exports = strategy;
