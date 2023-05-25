import logger from './logger';

/**
 * Wrapper that throws an exception and logs its message through pino
 * @summary This wrapper is intended for important exceptions that have significant impact on the end customer.
 * An example would be if we deployed the portal without setting up the JWT_SECRET. In such cases, a logged exception is crucial.
 * However, for exceptions that occur during regular occurrences like authentication failures, they are not of great importance.
 * @param {string | Error} error - The error message or error object to be thrown and logged
 */
const throwLoggedException = (error: string | Error) => {
	if (typeof jest !== undefined) {
		return;
	}

	if (typeof error === 'string') {
		logger.error(error);
		throw new Error(error);
	} else {
		logger.error(error.message);
		throw error;
	}
};

export default throwLoggedException;
