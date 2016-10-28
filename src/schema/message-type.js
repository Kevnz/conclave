const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} = require('graphql');
const BookshelfType = require('graphql-bookshelf').default;
const Message = require('../models/message');

const MessageType = new GraphQLObjectType(BookshelfType({
  name: 'Message',
  description: 'A Message',
  fields: (model) => ({
    id: model.attr({
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the message.'
    }),
    title: model.attr({
      type: GraphQLString,
      description: 'The title of the message'
    }),
    body: model.attr({
      type: GraphQLString,
      description: 'The message body'
    }),
    replies: model.hasMany({
      type: new GraphQLList(MessageType),
      description: 'Replies to this message'
    })
  })
}));

module.exports = MessageType;
