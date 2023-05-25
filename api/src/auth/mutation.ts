import { findUserByEmailAndPass, saveUserToken } from '../resolvers/user.resolvers';
import jsonwebtoken from 'jsonwebtoken';
import { isNil } from 'lodash';
import { AuthErrors } from './errors';
import { getJWTSecret } from './utils';
const { sign, decode, verify } = jsonwebtoken;

const login = async (parent: any, { email, password }: { email: string; password: string }) => {
	const user = await findUserByEmailAndPass(email, password);

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

	const secret = getJWTSecret();
	const expiresIn = '1h';

	const token = sign(payload, secret, { expiresIn });

	await saveUserToken(user.id, token);

	return token;
};

export const AuthMutations = {
	login
};
