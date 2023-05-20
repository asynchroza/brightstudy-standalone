import { User } from '@prisma/client';
import { loginUser } from '../resolvers/user.resolvers';
import jsonwebtoken from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { isNil } from 'lodash';
import { AuthErrors } from './errors';
const { sign, decode, verify } = jsonwebtoken;

const login = async (parent: any, { email, password }: { email: string; password: string }) => {
	const user = (await loginUser(email, password)) as User;

	if (isNil(user)) {
		throw AuthErrors.unauthenticatedError;
	}

	const payload = { 'https://something.com': { id: user.id, name: user.name } };
	const secret = 'secret';

	return sign(payload, secret);
};

export const AuthMutations = {
	login
};
