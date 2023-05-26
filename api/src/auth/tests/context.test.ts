import { ALLOWED_OPERATIONS } from '../context';
import { authenticateUser } from '../context';
import { AuthErrors } from '../errors';
import { User } from '@prisma/client';

jest.mock('../../resolvers/user.resolvers');

import { getAndVerifyUserByToken } from '../../resolvers/user.resolvers';

describe('AuthenticateUser', () => {
	let mockedReq: any;

	beforeEach(() => {
		mockedReq = {
			req: {
				body: {
					operationName: 'OPERATION'
				},
				headers: {
					authorization: 'some-token'
				}
			}
		};
		jest.clearAllMocks();
	});

	describe('Allowed operations', () => {
		it('returns empty object when operation is LOGIN', async () => {
			mockedReq.req.body.operationName = ALLOWED_OPERATIONS.LOGIN;
			const response = await authenticateUser(mockedReq);
			expect(response).toStrictEqual({});
		});

		it('returns empty object when operation is REGISTER', async () => {
			mockedReq.req.body.operationName = ALLOWED_OPERATIONS.REGISTER;
			const response = await authenticateUser(mockedReq);
			expect(response).toStrictEqual({});
		});
	});

	describe('Authenticate user', () => {
		it('throws authorization exception when user is not validated', async () => {
			// getAndVerifyUserByToken.mockReturnValue(undefined);
			try {
				await authenticateUser(mockedReq);
			} catch (err) {
				expect(err).toBe(AuthErrors.unauthenticatedError);
			}
		});

		it('returns user object when user is validated', async () => {
			const mockedResponse = {
				firstName: 'John',
				lastName: 'Wick',
				id: 1,
				email: 'some@email.com',
				password: 'password',
				token: 'sometoken'
			} as User;

			(getAndVerifyUserByToken as jest.Mock).mockReturnValue(mockedResponse);

			const res = await authenticateUser(mockedReq);

			expect(res.user?.firstName).toBe(mockedResponse.firstName);
		});
	});
});
