import { ApolloClient, InMemoryCache } from '@apollo/client';
import { getServerURI } from './utils';

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: getServerURI(),
	credentials: 'include'
});
