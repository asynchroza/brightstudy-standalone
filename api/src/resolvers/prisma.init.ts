import { PrismaClient } from '@prisma/client';

if (!(global as any).prisma) {
	(global as any).prisma = new PrismaClient();
}

export const prisma = (global as any).prisma;
