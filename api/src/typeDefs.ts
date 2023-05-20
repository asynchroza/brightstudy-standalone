// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

export const typeDefs = `#graphql
  scalar DateTime

  type User {
    id: Int!
    name: String!
    createdAt: DateTime!
    messages: [Message!]!
  }

  type Message {
    id: Int!
    body: String!
    createdAt: DateTime!
    userId: Int!
    user: User!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    login(email: String!, password: String): String
  }
`;
