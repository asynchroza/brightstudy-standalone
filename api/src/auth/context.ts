import { GraphQLError } from 'graphql';
import { isNil } from 'lodash';
import { getUserByToken } from '../resolvers/user.resolvers';

export const AuthenticateUser = async ({ req }: { req: any }) => {
	// get the user token from the headers
	const token = req.headers.authorization || '';

	// try to retrieve a user with the token
	const user = await getUserByToken(token);

	// optionally block the user
	// TODO: we could also check user roles/permissions here
	// TODO: implement jwt
	if (isNil(user))
		// throwing a `GraphQLError` here allows us to specify an HTTP status code,
		// standard `Error`s will have a 500 status code by default
		throw new GraphQLError('User is not authenticated', {
			extensions: {
				code: 'UNAUTHENTICATED',
				http: { status: 401 }
			}
		});

	// add the user to the context
	return { user };
};
