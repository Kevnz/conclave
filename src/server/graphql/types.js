const { gql } = require('apollo-server-hapi')

const typeDefs = gql`
  type User {
    firstName: String
    lastName: String
    email: String
    token: String
  }
  type Query {
    user(token: ID): User
    login(email: String!, password: String!): User!
  }

  type Mutations {
    signup(firstName: String!
    lastName: String!
    email: String!
    password: String!
    ): User!
  }
`

module.exports = typeDefs
