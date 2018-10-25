const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))
const bookshelf = require('./bookshelf')
require('./topic')
require('./message')

module.exports = bookshelf.model(
  'User',
  {
    tableName: 'users',
    idAttribute: 'id',
    topics: function topicRelation() {
      return this.hasMany('Topic', 'created_by')
    },
    messages: function messagesRelation() {
      return this.hasMany('Message', 'created_by')
    },
    hidden: ['password'],
  },
  {
    login: Promise.method(function authenticateUser(email, password) {
      if (!email || !password) {
        throw new Error('Email and password are both required')
      }
      return new this({ email: email.toLowerCase().trim() })
        .fetch()
        .tap(function tapUser(user) {
          console.log('Tap That User', user)
          if (user === null) return null
          return bcrypt
            .compare(password, user.get('password'))
            .then(function compareResponse(res) {
              console.log('then compare async')
              if (!res) throw new Error('Invalid password')
            })
        })
    }),
    register: Promise.method(function registerUser(
      firstName,
      lastName,
      email,
      password
    ) {
      const saltRounds = 10
      const salt = bcrypt.genSaltSync(saltRounds)
      const hashedPassword = bcrypt.hashSync(password, salt)
      return new this({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      }).save()
    }),
  }
)
