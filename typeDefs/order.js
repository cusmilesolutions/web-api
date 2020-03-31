const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    order(id: ID!): Order
    orders: [Order!]!
    onDeliveryOrders: [Order!]!
    cancelledOrders: [Order!]!
    deliveredOrders: [Order!]!
  }
  extend type Mutation {
    addOrder(
      customer: String!
      itemName: String!
      itemType: String!
      itemCount: String!
      price: String!
      startPt: String!
      deliveryPt: String!
      description: String
    ): Order
    approveOrder(id: ID!): Order
    cancelOrder(id: ID!): Order
    deliveredOrder(id: ID!): Order
  }
  type Order {
    _id: ID!
    orderNo: String!
    customer: String!
    itemName: String!
    itemType: String!
    itemCount: String!
    price: String!
    startPt: String!
    deliveryPt: String!
    description: String
    status: String!
    creator: Admin!
    createdAt: String!
  }
`;
