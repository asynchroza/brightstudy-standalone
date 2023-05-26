import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/index.ts';

import AdministrationPanel from './pages/AdministrationPanel';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(
	createRoutesFromElements([<Route path="/" element={<App />} />, <Route path="administration" element={<AdministrationPanel />} />])
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<RouterProvider router={router} />
		</ApolloProvider>
	</React.StrictMode>
);
