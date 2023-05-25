import logger from './logger';

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
