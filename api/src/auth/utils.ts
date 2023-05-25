import { isNil } from 'lodash';
import LoggedError from '../../utils/exceptions';

export const getJWTSecret = (): string => {
	const JWT_SECRET = process.env.JWT_SECRET;
	if (isNil(JWT_SECRET)) throw LoggedError(`JWT_SECRET isn't loaded into environment`);

	return JWT_SECRET;
};
