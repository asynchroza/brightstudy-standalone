import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/index.ts';

import AdministrationPanel from './pages/AdministrationPanel/AdministrationPanel.tsx';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import PrivateComponentWrapper from './components/PrivateComponetWrapper/PrivateComponentWrapper.tsx';
import LoginPage from './pages/LoginPage/LoginPage.tsx';

const router = createBrowserRouter(
	createRoutesFromElements([
		<Route path="/" element={<App />} />,
		<Route path="login" element={<LoginPage />} />,
		<Route
			path="administration"
			element={
				<PrivateComponentWrapper
					redirectPath={'/login'}
					isAuthenticated={async () => {
						return new Promise((resolve) =>
							setTimeout(() => {
								resolve(true);
							}, 2000)
						);
					}}
					children={<AdministrationPanel />}
				/>
			}
		/>
	])
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<RouterProvider router={router} />
		</ApolloProvider>
	</React.StrictMode>
);
