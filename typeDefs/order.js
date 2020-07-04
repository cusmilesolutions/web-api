const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    order(id: ID!): Order
    orders: OrderList!
    subOrders(status: String!): OrderList!
    paymentStatus(status: String!): OrderList!
  }
  extend type Mutation {
    addOrder(
      senderName: String!
      senderPhone: String!
      recipientName: String!
      recipientPhone: String!
      itemName: String!
      itemType: String!
      itemCount: String!
      description: String
      price: String!
      method: String!
      startPt: String!
      deliveryPt: String!
    ): Order
    approveOrder(id: ID!): Order
    cancelOrder(id: ID!): Order
    deliveredOrder(id: ID!): Order
  }
  type Order {
    _id: ID!
    orderNo: String!
    item: Item
    sender: Sender
    recipient: Recipient
    payment: Payment
    shipping: Shipping
    rider: Rider
    orderStatus: String!
    creator: Admin!
    createdAt: String!
  }

  type OrderList {
    orders: [Order!]!
    totalOrders: Int!
  }

  type Item {
    itemName: String
    itemType: String
    itemCount: String
    description: String
  }

  type Recipient {
    recipientName: String
    recipientPhone: String
  }

  type Sender {
    senderName: String
    senderPhone: String
  }

  type Payment {
    price: String
    method: String
    status: String
    date: String
  }

  type Shipping {
    startPt: String
    deliveryPt: String
    dateDeliverd: String
    timeDelivered: String
  }
`;
