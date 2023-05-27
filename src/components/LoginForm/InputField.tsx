import { FC, Ref, useEffect, useState } from 'react';
import styled from 'styled-components';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

const FIELD_HEIGHT = `3rem`;
const BORDER_WIDTH = `0.2rem`;

const getNumFromREM = (rem: string) => Number.parseFloat(rem.split('rem')[0]);

const InputContainer = styled.div`
	margin-top: 1rem;
	margin-bottom: 1rem;

	label {
		font-weight: 700;
		font-size: medium;
		color: ${(props) => props.color};
	}

	input {
		width: 20rem;
		height: ${FIELD_HEIGHT};
		padding: 0;
		border: solid;
		border-width: ${BORDER_WIDTH};
		border-color: ${(props) => props.color};
		outline: 0;
		padding-left: 1rem;
		font-size: large;
		font-family: Roboto;
		font-weight: 700;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
	}
`;

const InputIconBox = styled.div`
	width: ${FIELD_HEIGHT};
	height: ${FIELD_HEIGHT};
	background-color: ${(props) => props.color};
	border: solid;
	border-width: ${BORDER_WIDTH};
	display: flex;
	justify-content: center;
	align-items: center;
	border-color: ${(props) => props.color};
	border-top-left-radius: 10%;
	border-bottom-left-radius: 10%;

	svg {
		height: ${getNumFromREM(FIELD_HEIGHT) - 1.75}rem;
		width: ${getNumFromREM(FIELD_HEIGHT) - 1.75}rem;
		color: white;
	}
`;

const InputFieldContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

const onBlurHandler = (setState: (value: React.SetStateAction<string>) => void, color: string) => {
	setState(color);
};

export const InputField = ({
	register,
	registerOptions,
	inputName,
	inputType,
	Icon,
	label,
	isFocusDisabled,
	primaryColor,
	focusedColor,
	forwardedRef
}: {
	// eslint-disable-next-line
	register: UseFormRegister<any>;
	inputName: string;
	registerOptions: RegisterOptions;
	inputType: string;
	Icon: FC;
	label: string;
	isFocusDisabled?: boolean;
	primaryColor: string;
	focusedColor: string;
	// eslint-disable-next-line
	// @ts-ignore
	forwardedRef?: Ref | undefined;
}) => {
	const [color, setColor] = useState(primaryColor);

	useEffect(() => {
		if (isFocusDisabled && forwardedRef) {
			forwardedRef.blur();

			if (color !== primaryColor) {
				onBlurHandler(setColor, primaryColor);
			}
		}
	}, [isFocusDisabled, forwardedRef, setColor, primaryColor, color]);

	return (
		<InputContainer color={color}>
			<label>{label}</label>
			<br />
			<InputFieldContainer>
				<InputIconBox color={color}>
					<Icon />
				</InputIconBox>
				<input
					{...register(inputName, registerOptions)}
					type={inputType}
					onFocus={() => {
						setColor(focusedColor);
					}}
					onBlur={() => {
						onBlurHandler(setColor, primaryColor);
					}}
				/>
			</InputFieldContainer>
		</InputContainer>
	);
};
