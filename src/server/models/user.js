/* eslint-disable spellcheck/spell-checker */
const bcrypt = require('bcrypt')
const Joi = require('@hapi/joi')
const bookshelf = require('../bookshelf')
const { InvalidPasswordError } = require('../errors')
// const email = require('../email')
require('./topic')
require('./message')
const saltRounds = 10

const schema = {
  required: {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
  },
  optional: {
    password: Joi.string().optional(),
  },
  base: {
    id: Joi.any().optional(),
    created_at: Joi.date().optional(),
    updated_at: Joi.date().optional(),
  },
}
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
    schema,
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
    getById: async function(id) {
      const user = new this({ id })
      await user.fetch()
      return user
    },
    register: async function({
      firstName,
      lastName,
      email,
      password,
      username,
    }) {
      const hashedPassword = await bcrypt.hash(password, saltRounds)

      return new this({
        firstName,
        lastName,
        email: email.toLowerCase().trim(),
        username,
        password: hashedPassword,
      }).save()
    },
    // eslint-disable-next-line sonarjs/no-identical-functions
    addUser: async function({
      firstName,
      lastName,
      email,
      password,
      username,
    }) {
      const hashedPassword = await bcrypt.hash(password, saltRounds)
      return new this({
        firstName,
        lastName,
        email: email.toLowerCase().trim(),
        username,
        password: hashedPassword,
      }).save()
    },
  }
)
