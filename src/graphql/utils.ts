export const getServerURI = () => {
	return origin.replace(/(^[^:]*:[^:]*):.*$/, '$1') + ':4000';
};
