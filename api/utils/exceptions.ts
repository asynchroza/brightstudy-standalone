import logger from './logger';

const LoggedError = (error: string | Error): Error => {
	if (typeof error === 'string') {
		logger.error(error);
		return new Error(error);
	} else {
		logger.error(error.message);
		return error;
	}
};

export default LoggedError;
