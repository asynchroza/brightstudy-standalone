import { AuthMutations } from '../mutation';
import { findUserByEmailAndPass, saveUserToken } from '../../resolvers/user.resolvers';
import jsonwebtoken from 'jsonwebtoken';
import { AuthErrors } from '../errors';

jest.mock('../../resolvers/user.resolvers');
jest.mock('jsonwebtoken');

describe('login', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should login the user and return a token', async () => {
		// Mock findUserByEmailAndPass to return a user
		const user = {
			id: '1',
			firstName: 'John',
			lastName: 'Doe',
			permissions: ['read', 'write']
		};
		(findUserByEmailAndPass as jest.Mock).mockResolvedValue(user);

		// Mock sign to return a token
		const token = 'mocked-token';
		(jsonwebtoken.sign as jest.Mock).mockReturnValue(token);

		// Mock saveUserToken
		(saveUserToken as jest.Mock).mockResolvedValue(undefined);

		// Define input arguments
		const email = 'john@example.com';
		const password = 'password';

		const ctx = {
			res: new Map()
		};

		// Call the login function
		const result = await AuthMutations.login(null, { email, password }, ctx);

		// Verify the expected behavior
		expect(result).toBe('success'); // Check if the token is returned

		// Verify the function calls
		expect(findUserByEmailAndPass).toHaveBeenCalledWith(email, password);
		expect(saveUserToken).toHaveBeenCalledWith(user.id, token);

		// Verify the sign function call with the correct payload and secret
		expect(jsonwebtoken.sign).toHaveBeenCalledWith(
			{
				brightstudy: {
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					permissions: user.permissions
				}
			},
			expect.any(String), // Verify that the secret is passed
			{ expiresIn: '1h' }
		);
	});

	it('should throw an error if user is not found', async () => {
		// Mock findUserByEmailAndPass to return null
		(findUserByEmailAndPass as jest.Mock).mockResolvedValue(null);

		// Define input arguments
		const email = 'john@example.com';
		const password = 'password';

		// Call the login function and expect it to throw an error
		await expect(AuthMutations.login(null, { email, password }, {})).rejects.toThrow(AuthErrors.unauthenticatedError);

		// Verify the function call
		expect(findUserByEmailAndPass).toHaveBeenCalledWith(email, password);

		// Verify that saveUserToken is not called
		expect(saveUserToken).not.toHaveBeenCalled();

		// Verify that sign is not called
		expect(jsonwebtoken.sign).not.toHaveBeenCalled();
	});
});
