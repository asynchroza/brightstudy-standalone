import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

type AuthRouteProps = {
	isAuthenticated: () => Promise<boolean>;
	redirectPath?: string;
	children: ReactNode;
};

const PrivateComponentWrapper = ({ isAuthenticated, children, redirectPath = '/' }: AuthRouteProps) => {
	const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		const checkAuth = async () => {
			const isAuth = await isAuthenticated();
			setIsAuth(isAuth);
		};

		checkAuth();
	}, [isAuthenticated]);

	if (isAuth === undefined) return <h1>LOADING</h1>;
	else if (isAuth) return <>{children}</>;

	return <Navigate to={redirectPath} replace={true} />;
};

export default PrivateComponentWrapper;
