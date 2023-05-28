export const getServerURI = () => {
	return origin.replace(/(^[^:]*:[^:]*):.*$/, '$1').replace('https', 'http') + ':4000';
};
