import { ApolloServer } from '@apollo/server';
import { DateTimeResolver } from 'graphql-scalars';
import { typeDefs } from './typeDefs';
import { authenticateUser } from './auth/context';
import { userQueries } from './resolvers/user.resolvers';
import { AuthMutations } from './auth/mutation';
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import fs from 'fs';
import logger from '../utils/logger';
import bodyParser from 'body-parser';
import https from 'https';
import cors from 'cors';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import path from 'path';

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

const combinedCtx = async ({ req, res }: { req: any; res: any }) => {
	const passthroughCtx = { req, res };

	const authenticatedUser = await authenticateUser({ req });

	const mergedCtx = {
		...authenticatedUser,
		...passthroughCtx
	};

	return mergedCtx;
};

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
	logger.info(`[${req.method}][${JSON.stringify(req.body)}]`);
	next();
});

// Read the SSL certificate files
const key = path.resolve(__dirname, '../../certs/localhost.key');
const cert = path.resolve(__dirname, '../../certs/localhost.crt');

const sslOptions = {
	key: fs.readFileSync(key),
	cert: fs.readFileSync(cert)
};

// eslint-disable-next-line
// @ts-ignore
const httpServer = https.createServer(sslOptions, app);

const server = new ApolloServer({ resolvers, typeDefs, plugins: [ApolloServerPluginDrainHttpServer({ httpServer })] });

(async () => {
	await server.start();

	app.use(
		'/',
		cors<cors.CorsRequest>({
			credentials: true,
			exposedHeaders: ['Set-Cookie'],
			origin: ['https://localhost:5173']
		}),
		// 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
		bodyParser.json({ limit: '50mb' }),
		// expressMiddleware accepts the same arguments:
		// an Apollo Server instance and optional configuration options
		expressMiddleware(server, {
			context: combinedCtx
		})
	);

	await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
})();
