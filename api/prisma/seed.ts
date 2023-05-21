// prisma/seed.ts

import { Permission, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	// Delete all `User` and `Message` records
	await prisma.user.deleteMany({});
	// (Re-)Create dummy `User` and `Message` records
	await prisma.user.create({
		data: {
			firstName: 'Toni',
			lastName: 'Montana',
			password: 'password',
			email: 'tonimontana@gmail.com',
			permissions: Permission.STUDENT,
			token: 'default'
		}
	});

	await prisma.user.create({
		data: {
			firstName: 'Kay',
			lastName: 'Be',
			password: 'password',
			email: 'kaybe@gmail.com',
			permissions: Permission.ADMIN,
			token: 'default'
		}
	});
}

main().then(() => {
	console.log('Data seeded...');
});
