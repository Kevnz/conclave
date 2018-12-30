const { gql } = require('apollo-server-hapi')

const typeDefs = gql`
  type User {
    firstName: String
    lastName: String
    email: String
    token: String
  }
  type Topic {
    title: String
    description: String
    createdBy: User
    parent: Topic
    messages: [Message]
  }
  type Message {
    title: String
    body: String
    createdBy: User
    parent: Topic
    replies: [Message]
  }
  type Query {
    topics(): [Topic]
    messages(topicId: ID!): [Message]
    user(token: ID): User
    login(email: String!, password: String!): User!
  }

  type Mutations {
    signup(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User!
  }
`

module.exports = typeDefs
