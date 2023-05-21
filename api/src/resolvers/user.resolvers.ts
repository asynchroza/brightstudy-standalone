import { User } from '@prisma/client';
import { prisma } from './prisma.init';
import { verify } from 'jsonwebtoken';
import { AuthErrors } from '../auth/errors';

/** Gets all users from database */
const getUsers = () => {
	return prisma.user.findMany();
};

export const getAndVerifyUserByToken = (token: string) => {
	try {
		verify(token, 'secret');
	} catch {
		throw AuthErrors.unauthenticatedError;
	}

	const user = prisma.user.findFirst({
		where: {
			token
		}
	});

	return user;
};

export const loginUser = async (email: string, password: string) => {
	const user = await prisma.user.findFirst({
		where: {
			email
		}
	});

	if (user?.password === password) return user as User;
};

export const saveUserToken = async (id: number, token: string) => {
	await prisma.user.update({
		where: {
			id
		},
		data: {
			token
		}
	});
};

export const userQueries = {
	users: getUsers
};
