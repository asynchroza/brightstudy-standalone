import { User } from '@prisma/client';
import { prisma } from './prisma.init';

/** Gets all users from database */
export const getUsers = () => {
	return prisma.user.findMany();
};

export const getUserByToken = (token: string) => {
	const user = prisma.user.findFirst({
		where: {
			name: token
		}
	});

	return user;
};

// TODO: make it work with email and password
export const loginUser = async (email: string, password?: string) => {
	const user = await prisma.user.findFirst({
		where: {
			name: email
		}
	});

	return user;
};

export const userQueries = {
	users: getUsers
};
