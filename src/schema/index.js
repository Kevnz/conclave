const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const UserType = require('./user-type');
const TopicType = require('./topic-type');
const MessageType = require('./message-type');
const User = require('../models/user');
const Topic = require('../models/topic');
const Message = require('../models/message');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
      user: {
        type: UserType,
        args: {
          id: {
            type: GraphQLInt,
            description: 'ID of the current user.'
          }
        },
        description: 'The current user.',
        resolve: ((source, { id }) => User.where({ id }).fetch())
      },
      topic: {
        type: new GraphQLList(TopicType),
        args: {
          id: {
            type: GraphQLInt,
            description: 'ID of the parent topic.'
          }
        },
        description: 'The topics.',
        resolve: ((source, { id }) => Topic.getByParentId(id))
      },
      message: {
        type: MessageType,
        args: {
          id: {
            type: GraphQLInt,
            description: 'ID of the message.'
          }
        },
        description: 'The message.',
        resolve: ((source, { id }) => Message.where({ id }).fetch())
      }
    })
  })
});

module.exports = schema;
