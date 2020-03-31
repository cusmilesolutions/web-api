const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    login(email: String!, password: String!): AdminAuthData!
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
    ): Admin
    signOut: Boolean
  }

  type Admin {
    _id: ID!
    email: String!
    firstName: String!
    lastName: String!
    position: String!
    employeeID: String!
    orders: [Order!]!
    createdAt: String!
  }

  type AdminAuthData {
    token: String!
    adminId: String!
  }
`;
