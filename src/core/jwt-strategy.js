const passportJWT = require('passport-jwt')
const User = require('../models/user')
const config = require('xtconf')()
const cookieExtractor = require('./cookie-extractor')

const JwtStrategy = passportJWT.Strategy
const options = {}

options.jwtFromRequest = cookieExtractor
options.secretOrKey = config.get('auth-secret')

const strategy = new JwtStrategy(options, (payload, done) => {
  new User({ id: payload.id })
    .fetch()
    .then(user => {
      done(null, user.toJSON())
    })
    .catch(err => {
      done(err, false)
    })
})

module.exports = strategy
