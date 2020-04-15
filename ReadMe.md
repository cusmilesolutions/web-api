### Overview of the API

The Web API is build in GraphQL using the apollo-server-express module or engine. The API also implements a NoSQL database, MongoDB using the mongoose Object Document Mapper(ODM) to support the Create Read Update Delete(CRUD) operations performed on the system.

### Structure of the API

**Package Manager** : Yarn
**API type**: GraphQL(Apollo Express Server)
The API has three Schemas or Type definitions(typeDef): admin, order and rider. Each typeDef has some mutations and queries.

1. Admin

   **Mutations**
   login(email: String!, password: String!): AdminAuthData!
   signUp(firstName: String!, lastName: String!, email: String!, password: String!, employeeID: String!,position: String!): Admin
   signOut: Boolean

   **Queries**
   admins: [Admin!]!

   **Types**
   Admin {
   \_id: ID!
   email: String!
   firstName: String!
   lastName: String!
   position: String!
   employeeID: String!
   orders: [Order!]!
   createdAt: String!
   }
   AdminAuthData {
   token: String!
   adminId: String!
   }

2. Order
   **Mutation**
   addOrder(customer: String!,itemName: String!,itemType: String!,itemCount: String!,price: String!,startPt: String!,deliveryPt: String!,description: String): Order
   approveOrder(id: ID!): Order
   cancelOrder(id: ID!): Order
   deliveredOrder(id: ID!): Order

Authentication: The API uses the JSON Web Token(JWT) to authenticate and authorize users on the application.
Database Type: NoSQL using MongoDB
