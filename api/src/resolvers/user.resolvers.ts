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

export const userQueries = {
	users: getUsers
};
