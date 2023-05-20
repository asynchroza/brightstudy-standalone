import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** Gets all users from database */
export const GetUsers = () => {
	return prisma.user.findMany();
};
