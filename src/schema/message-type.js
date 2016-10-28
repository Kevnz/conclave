const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  graphql
} = require('graphql');
const BookshelfType = require('graphql-bookshelf').default;
const Message = require('../models/message');

module.exports = new GraphQLObjectType(BookshelfType({
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
    })
  })
}));
