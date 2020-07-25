const { gql } = require('apollo-server-express');

module.exports = gql`
  enum TaskStatus {
    uncompleted
    completed
  }

  extend type Query {
    tasks: TasksList!
    subTasks(status: TaskStatus!): TasksList!
  }

  extend type Mutation {
    createTask(title: String, description: String, deadline: String): Task!
    deleteTask(id: ID): Boolean
    completeTask(id: ID): Task!
  }

  type TasksList {
    tasks: [Task]!
    totalTasks: Int!
  }

  type Task {
    _id: ID!
    title: String!
    description: String!
    deadline: String
    status: TaskStatus
    createdAt: String!
  }
`;
