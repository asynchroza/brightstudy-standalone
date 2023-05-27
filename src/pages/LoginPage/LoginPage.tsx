import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage = ({ initialLogin = false }: { initialLogin?: boolean }) => {
	return <LoginForm initialLogin={initialLogin} />;
};

export default LoginPage;
