const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    login(email: String!, password: String!): AdminAuthData
    admin(id: ID!): Admin
    admins: [Admin!]!
  }

  extend type Mutation {
    signUp(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      employeeID: String!
      position: String!
      password: String!
    ): Admin
  }

  type Admin {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    position: String!
    employeeID: String!
    createdAt: String!
  }

  type AdminAuthData {
    token: String!
    userId: String!
  }
`;
