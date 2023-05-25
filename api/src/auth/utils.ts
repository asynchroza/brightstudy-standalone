import { isNil } from 'lodash';
import throwLoggedException from '../../utils/exceptions';

export const getJWTSecret = (): string => {
	const JWT_SECRET = typeof jest !== undefined ? 'TEST_TOKEN' : process.env.JWT_SECRET;
	if (isNil(JWT_SECRET)) {
		throwLoggedException(`JWT_SECRET isn't loaded into environment`);
	}

	// TypeScript might complain that JWT_SECRET could be undefined
	// because it doesn't recognize that we are explicitly throwing an exception
	// and breaking out of the normal control flow
	return JWT_SECRET as string;
};
