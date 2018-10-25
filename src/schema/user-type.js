const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  graphql,
} = require('graphql')
const BookshelfType = require('graphql-bookshelf').default
const User = require('../models/user')
const MessageType = require('./message-type')
const TopicType = require('./topic-type')

module.exports = new GraphQLObjectType(
  BookshelfType({
    name: 'User',
    description: 'A User',
    fields: model => {
      return {
        id: model.attr({
          type: new GraphQLNonNull(GraphQLInt),
          description: 'The id of the user.',
        }),
        firstName: model.attr({
          type: GraphQLString,
          description: 'The first name of the user.',
        }),
        lastName: model.attr({
          type: GraphQLString,
          description: 'The last name of the user.',
        }),
        email: model.attr({
          type: GraphQLString,
          description: 'The email of the user.',
        }),
        role: model.attr({
          type: GraphQLString,
          description: 'The role of the user',
        }),
        messages: model.hasMany({
          type: new GraphQLList(MessageType),
          description: 'All the messages the user has written.',
        }),
        topics: model.hasMany({
          type: new GraphQLList(TopicType),
          description: 'All the messages the user has written.',
        }),
      }
    },
  })
)
