/* eslint-disable spellcheck/spell-checker */
const bcrypt = require('bcrypt')
const bookshelf = require('../bookshelf')
const { InvalidPasswordError } = require('../errors')
// const email = require('../email')
require('./candidate')
const saltRounds = 10

/**
 * Class representing a User.
 * @class User
 * */
module.exports = bookshelf.model(
  'User',
  {
    tableName: 'users',
    idAttribute: 'id',
    hidden: ['password'],
    topics: function topicRelation() {
      return this.hasMany('Topic', 'created_by')
    },
    messages: function messagesRelation() {
      return this.hasMany('Message', 'created_by')
    },
    initialize() {
      this.on('created', model => {
        // send email
      })
    },
  },
  {
    /**
     * login
     *
     * @param {string} email - The email of the user
     * @param {string} password - The password of the User
     * @returns {User}
     */
    login: async function(email, password) {
      if (!email || !password) {
        return Promise.reject(new Error('Email and password are both required'))
      }
      const user = new this({ email: email.toLowerCase().trim() })
      await user.fetch()
      if (user === null) return null
      const res = await bcrypt.compare(password, user.get('password'))
      if (!res) {
        return Promise.reject(new InvalidPasswordError('Invalid password'))
      }
      return user
    },
    register: async function({ firstName, lastName, email, password }) {
      const hashedPassword = await bcrypt.hash(password, saltRounds)

      return new this({
        firstName,
        lastName,
        email: email.toLowerCase().trim(),
        password: hashedPassword,
      }).save()
    },
  }
)
