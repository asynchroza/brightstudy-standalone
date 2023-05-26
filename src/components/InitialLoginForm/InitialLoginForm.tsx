/* 
    This will be the login form used during the initialization of a portal. 
    Admins will have access to a pre-established admin account, 
    which allows them to create new accounts and subsequently delete the admin account. 
*/

import { RegisterOptions, useForm } from 'react-hook-form';
import styled from 'styled-components';

const StyledContainer = styled.div`
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

const InitialLoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginFormInputs>();

	const onSubmit = (data: LoginFormInputs) => {
		console.log(data);
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

				<button type="submit">Submit</button>
			</form>
		</StyledContainer>
	);
};

export default InitialLoginForm;
