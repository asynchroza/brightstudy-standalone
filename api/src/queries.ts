import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
