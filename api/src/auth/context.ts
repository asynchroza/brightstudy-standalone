import { isNil } from 'lodash';
import { getUserByToken } from '../resolvers/user.resolvers';
import { AuthErrors } from './errors';

const enum ALLOWED_OPERATIONS {
	LOGIN = 'Login',
	REGISTER = 'Register'
}

export const AuthenticateUser = async ({ req }: { req: any }) => {
	// get the user token from the headers
	const { operationName } = req.body;
	if (operationName === ALLOWED_OPERATIONS.LOGIN) return {};

	const token = req.headers.authorization || '';

	// try to retrieve a user with the token
	const user = await getUserByToken(token);

	// TODO: we could also check user roles/permissions here
	if (isNil(user)) throw AuthErrors.unauthenticatedError;

	// add the user to the context
	return { user };
};
