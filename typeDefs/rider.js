const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    rider(id: ID!): Rider
    riders: [Rider!]!
  }
  extend type Mutation {
    addRider(
      firstName: String!
      lastName: String!
      address: String!
      phone: String!
      pin: String
    ): Rider
    removeRider(id: ID!): Boolean!
  }
  type Rider {
    _id: ID!
    firstName: String!
    lastName: String!
    address: String!
    phone: String!
    riderId: String!
    orders: [Order!]!
    creator: Admin!
    createdAt: String!
  }
`;
