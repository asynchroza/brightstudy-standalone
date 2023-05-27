/* 
    This will be the login form used during the initialization of a portal. 
    Admins will have access to a pre-established admin account, 
    which allows them to create new accounts and subsequently delete the admin account. 
*/

import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaFingerprint } from 'react-icons/fa';
import { InputField } from './InputField';

const LOGIN_MUTATION = gql`
	mutation Login($email: String!, $password: String) {
		login(email: $email, password: $password)
	}
`;

const StyledContainer = styled.div`
	background-color: white;
	width: 30rem;
	height: 40rem;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	border-radius: 1%;
`;

type LoginFormInputs = {
	email: string;
	password: string;
};

const LoginForm = ({ initialLogin = false }: { initialLogin?: boolean }) => {
	const [login, { loading }] = useMutation(LOGIN_MUTATION);
	const navigate = useNavigate();

	const handleLogin = async (email: string, password: string) => {
		try {
			await login({ variables: { email, password } });
			/* 
				The process of transitioning from the login form to the administration panel or landing page involves two mutations: 
				- login and user verification. 
				
				Since we're working predominantly with the client side here, 
				there is no easy way for us to appropriately disable the rendered view 
				other than verifying each location change (use <PrivateComponentWrapper/>). 

				This can still be intercepted by Burp, for example, and someone who is really motivated to see what the admin panel 
				looks like will be more than free to do so. 

				Although no sensitive information will be displayed because token verification and 
				data generation always happen on the server.
			*/
			initialLogin ? navigate('/administration') : navigate('/home');
		} catch (error) {
			console.error(error);
		}
	};

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginFormInputs>();

	console.log(errors);

	const onSubmit = (data: LoginFormInputs) => {
		handleLogin(data.email, data.password);
	};

	// https://colorlib.com/wp/html5-and-css3-login-forms/

	return (
		<StyledContainer>
			<form onSubmit={handleSubmit(onSubmit)}>
				<InputField
					label="EMAIL"
					inputType="text"
					inputName="email"
					registerOptions={{
						required: 'Email is required',
						pattern: {
							value: /^\S+@\S+$/i,
							message: 'Invalid email address'
						}
					}}
					register={register}
					Icon={FaUserAlt}
					error={errors.email}
				/>
				<InputField
					label="PASSWORD"
					inputName="password"
					inputType="password"
					registerOptions={{
						required: 'Password is required'
					}}
					register={register}
					Icon={FaFingerprint}
					error={errors.password}
				/>
				<button type="submit">{loading ? 'Loading' : 'SIGN IN'}</button>
			</form>
		</StyledContainer>
	);
};

export default LoginForm;