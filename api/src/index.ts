import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { DateTimeResolver } from 'graphql-scalars';
import { typeDefs } from './typeDefs';
import { AuthenticateUser } from './auth/context';
import { userQueries } from './resolvers/user.resolvers';
import { AuthMutations } from './auth/mutation';
import logger from '../utils/logger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

/** define all query resolvers here */
const resolvers = {
	DateTime: DateTimeResolver,
	Query: {
		...userQueries
	},
	Mutation: {
		login: AuthMutations.login
	}
};

const server = new ApolloServer({ resolvers, typeDefs });

startStandaloneServer(server, { listen: { port: 4000 }, context: AuthenticateUser })
	.then(({ url }) => {
		console.log(`Server running at ${url}`);
	})
	.catch((error) => {
		logger.fatal(`Server stopped running due to the following error: ${error}`);
		console.error('Error starting server:', error);
	});
