import { AuthenticateUser } from '../context';
import { ALLOWED_OPERATIONS } from '../context';

const mockedReq: any = {
	req: {
		body: {
			operationName: 'OPERATION'
		}
	}
};

describe('AuthenticateUser', () => {
	describe('Allowed operations', () => {
		it('returns empty object when operation is LOGIN', async () => {
			mockedReq.req.body.operationName = ALLOWED_OPERATIONS.LOGIN;
			const response = await AuthenticateUser(mockedReq);
			expect(response).toStrictEqual({});
		});

		it('returns empty object when operation is REGISTER', async () => {
			mockedReq.req.body.operationName = ALLOWED_OPERATIONS.REGISTER;
			const response = await AuthenticateUser(mockedReq);
			expect(response).toStrictEqual({});
		});
	});
});
