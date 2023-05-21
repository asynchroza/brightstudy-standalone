import { loginUser } from '../resolvers/user.resolvers';
import jsonwebtoken from 'jsonwebtoken';
import { isNil } from 'lodash';
import { AuthErrors } from './errors';
const { sign, decode, verify } = jsonwebtoken;

const login = async (parent: any, { email, password }: { email: string; password: string }) => {
	const user = await loginUser(email, password);

	if (isNil(user)) {
		throw AuthErrors.unauthenticatedError;
	}

	const payload = {
		'https://something.com': { id: user.id, firstName: user.firstName, lastName: user.lastName }
	};
	const secret = 'secret';

	return sign(payload, secret);
};

export const AuthMutations = {
	login
};
