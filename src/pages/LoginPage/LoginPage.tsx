import LoginForm from '../../components/LoginForm/LoginForm';
import styled from 'styled-components';

const StyledContainer = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: silver;
`;

const LoginPage = () => {
	return (
		<StyledContainer>
			<LoginForm />
		</StyledContainer>
	);
};

export default LoginPage;
