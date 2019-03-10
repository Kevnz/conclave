const bookshelf = require('../bookshelf')
const User = require('./user')
const Topic = require('./topic')
const Message = require('./message')

const Users = bookshelf.Collection.extend({
  model: User,
})
const Topics = bookshelf.Collection.extend({
  model: Topic,
})
const Messages = bookshelf.Collection.extend({
  model: Message,
})

module.exports = {
  Topic,
  Topics,
  User,
  Users,
  Message,
  Messages,
  topic: Topic,
  topics: Topics,
  user: User,
  users: Users,
  message: Message,
  messages: Messages,
}
