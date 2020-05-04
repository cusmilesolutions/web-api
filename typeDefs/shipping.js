const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        shipping(id: ID!): Shipping
        shipping: ShippingList!
        subShippings(status: String!): ShippingList        
    }
    extend type Mutation {

    }

    type Shipping {
        _id: ID!
        shippingId: String!
        order: Order!
        rider: Rider!
        shippingStatus: String!
        paymentStatus: String!
        paymentMethod: String!
        creator: Admin!
        createdAt: String!
    }
    
    type ShippingList {
        shippings: [Shipping!]!
        totalShippings: Int!
    }
`;
