/* 
    This will be the login form used during the initialization of a portal. 
    Admins will have access to a pre-established admin account, 
    which allows them to create new accounts and subsequently delete the admin account. 
*/

import { RegisterOptions, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const LOGIN_MUTATION = gql`
	mutation Login($email: String!, $password: String) {
		login(email: $email, password: $password)
	}
`;

const StyledContainer = styled.div`
	// TODO: remove absolute position and import element in a page (container)
	// where you will define the positions of components
	position: absolute;
	background-color: silver;

	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
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

	const onSubmit = (data: LoginFormInputs) => {
		handleLogin(data.email, data.password);
	};

	return (
		<StyledContainer>
			<h1>BRIGHTSTUDY</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label>Email:</label>
					<input
						type="text"
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /^\S+@\S+$/i,
								message: 'Invalid email address'
							}
						} as RegisterOptions)}
					/>
					{errors.email && <p>{errors.email.message}</p>}
				</div>

				<div>
					<label>Password:</label>
					<input
						type="password"
						{...register('password', {
							required: 'Password is required'
						} as RegisterOptions)}
					/>

					{errors.password && <p>{errors.password.message}</p>}
				</div>

				<button type="submit">{loading ? 'Loading' : 'Submit'}</button>
			</form>
		</StyledContainer>
	);
};

export default LoginForm;
