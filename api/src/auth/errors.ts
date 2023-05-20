import { GraphQLError } from 'graphql';

const unauthenticatedError = new GraphQLError('User is not authenticated', {
	extensions: {
		code: 'UNAUTHENTICATED',
		http: { status: 401 }
	}
});

export const AuthErrors = {
	unauthenticatedError
};
