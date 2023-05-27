import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type AuthRouteProps = {
	isAuthenticated: () => boolean;
	redirectPath?: string;
	children: ReactNode;
};

const PrivateComponentWrapper = ({ isAuthenticated, children, redirectPath = '/' }: AuthRouteProps) => {
	return isAuthenticated() ? <>{children}</> : <Navigate to={redirectPath} replace={true} />;
};

export default PrivateComponentWrapper;
