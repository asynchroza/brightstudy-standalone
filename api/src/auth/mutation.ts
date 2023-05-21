import { loginUser, saveUserToken } from '../resolvers/user.resolvers';
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
		brightstudy: {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			permissions: user.permissions
		}
	};

	const secret = 'secret';
	const expiresIn = '1h';

	const token = sign(payload, secret, { expiresIn });
	await saveUserToken(user.id, token);

	return token;
};

export const AuthMutations = {
	login
};
