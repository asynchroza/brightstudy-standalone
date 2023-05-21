import { User } from '@prisma/client';
import { prisma } from './prisma.init';
import { verify } from 'jsonwebtoken';
import { AuthErrors } from '../auth/errors';

/** Gets all users from database */
const getUsers = () => {
	return prisma.user.findMany();
};

/**
 * Fetch user after verifying the provided jwt token
 * @param {string} token - jwt token
 * @return {User}
 */
export const getAndVerifyUserByToken = (token: string): User => {
	try {
		verify(token, process.env.JWT_SECRET || '');
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

/**
 * Finds user by email and password
 * @param {string} email - user's email
 * @param {string} password - user's password
 * @return found user or undefined
 */
export const findUserByEmailAndPass = async (email: string, password: string): Promise<User | undefined> => {
	const user = await prisma.user.findFirst({
		where: {
			email
		}
	});

	// TODO: Come up with a way to compare hashed passwords
	if (user?.password === password) return user as User;
};

/**
 * Update database token entry of user
 * @param {number} id - Primary Key of user
 * @param {string} token - JWT token
 */
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
