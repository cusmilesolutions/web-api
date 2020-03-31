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
      riderID: String!
      pin: String!
    ): Rider
  }
  type Rider {
    id: ID!
    fname: String!
    lname: String!
    address: String!
    phone: String!
    riderID: String!
    orders: [Order!]!
    creator: Admin!
    createdAt: String!
  }
`;
