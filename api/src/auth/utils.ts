import { isNil } from 'lodash';

export const getJWTSecret = (): string => {
	const JWT_SECRET = process.env.JWT_SECRET;
	if (isNil(JWT_SECRET)) throw new Error(`JWT_SECRET isn't loaded into environment`);

	return JWT_SECRET;
};
