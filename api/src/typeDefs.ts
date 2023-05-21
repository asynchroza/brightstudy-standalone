// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

export const typeDefs = `#graphql
  scalar DateTime

  type User {
    id: Int!
    email: String!
    password: String!
    firstName: String
    lastName: String
    token: String
    permissions: [Permission!]!
  }

  enum Permission {
    ADMIN
    PROFESSOR
    STUDENT
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    login(email: String!, password: String): String
  }
`;
