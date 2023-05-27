import { FC } from 'react';
import styled from 'styled-components';
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';

const FIELD_HEIGHT = `3rem`;

const InputContainer = styled.div`
	padding: 1rem;

	label {
		font-weight: 700;
		font-size: medium;
	}

	input {
		width: 20rem;
		height: ${FIELD_HEIGHT};
		padding: 0;
	}
`;

const InputIconBox = styled.div`
	width: 3rem;
	height: ${FIELD_HEIGHT};
	background-color: pink;
`;

const InputFieldContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

export const InputField = ({
	register,
	registerOptions,
	inputName,
	inputType,
	Icon,
	label,
	error
}: {
	// eslint-disable-next-line
	register: UseFormRegister<any>;
	inputName: string;
	registerOptions: RegisterOptions;
	inputType: string;
	Icon: FC;
	label: string;
	error: FieldError | undefined;
}) => {
	return (
		<InputContainer>
			<label>{label}</label>
			<br />
			<InputFieldContainer>
				<InputIconBox>
					<Icon />
				</InputIconBox>
				<input {...register(inputName, registerOptions)} type={inputType} />
			</InputFieldContainer>
			{error && <p>{error.message}</p>}
		</InputContainer>
	);
};
