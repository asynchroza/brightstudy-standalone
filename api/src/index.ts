import { ApolloServer } from '@apollo/server';
import { PrismaClient } from '@prisma/client';
import { startStandaloneServer } from '@apollo/server/standalone';
import { DateTimeResolver } from 'graphql-scalars';

const prisma = new PrismaClient();

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
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
`;

const resolvers = {
	DateTime: DateTimeResolver,
	Query: {
		users: () => {
			return prisma.user.findMany();
		}
	}
};

const server = new ApolloServer({ resolvers, typeDefs });
startStandaloneServer(server, { listen: { port: 4000 } })
	.then(({ url }) => {
		console.log(`Server running at ${url}`);
	})
	.catch((error) => {
		console.error('Error starting server:', error);
	});
