const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  graphql,
} = require('graphql')
const BookshelfType = require('graphql-bookshelf').default
const Topic = require('../models/topic')

const TopicType = new GraphQLObjectType(
  BookshelfType({
    name: 'Topic',
    description: 'A Topic',
    fields: model => ({
      id: model.attr({
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The id of the message.',
      }),
      title: model.attr({
        type: GraphQLString,
        description: 'The title of the topic',
      }),
      description: model.attr({
        type: GraphQLString,
        description: 'The description of the topic',
      }),
      children: model.hasMany({
        type: new GraphQLList(TopicType),
        description: 'Topics under this topic',
      }),
    }),
  })
)

module.exports = TopicType
