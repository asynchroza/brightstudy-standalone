import { isNil } from 'lodash';
import { getAndVerifyUserByToken } from '../resolvers/user.resolvers';
import { AuthErrors } from './errors';

enum ALLOWED_OPERATIONS {
	LOGIN = 'Login',
	REGISTER = 'Register'
}

function isAllowedOperation(operationName: string): boolean {
	return Object.values(ALLOWED_OPERATIONS).includes(operationName as ALLOWED_OPERATIONS);
}

export const AuthenticateUser = async ({ req }: { req: any }) => {
	// get the user token from the headers
	const { operationName } = req.body;

	// certain operations do not need token verfication such as user LOGIN & REGISTER
	if (isAllowedOperation(operationName)) return {};

	const token = req.headers.authorization || '';

	// try to retrieve a user with the token
	const user = getAndVerifyUserByToken(token);

	// TODO: we could also check user roles/permissions here
	if (isNil(user)) throw AuthErrors.unauthenticatedError;

	// add the user to the context
	return { user };
};
