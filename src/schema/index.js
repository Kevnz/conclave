const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const UserType = require('./user-type');
const TopicType = require('./topic-type');
const User = require('../models/user');
const Topic = require('../models/topic');

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
        resolve: ((source, { id }) => {
          console.log('the thing', id);
          return User.where({ id: id }).fetch()
            .then((user) => {
              console.log('the then', user);
              return user;
            });
        })
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
      }
    })
  })
});

module.exports = schema;
