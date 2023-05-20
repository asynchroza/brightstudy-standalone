import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { DateTimeResolver } from 'graphql-scalars';
import { typeDefs } from './typeDefs';
import { GetUsers } from './queries';

/** define all query resolvers here */
const resolvers = {
	DateTime: DateTimeResolver,
	Query: {
		users: GetUsers
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
