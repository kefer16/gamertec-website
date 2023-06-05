import styled, { css } from "styled-components";
import { ActiveModalProps } from "./FondoModalStyled";

export const ModalStyled = styled.div<ActiveModalProps>`
	position: relative;
	width: 400px;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	visibility: hidden;
	padding: 30px;
	transform: translateY(-200px);
	transition: 0.5s;
	background-color: #fff;

	${({ activo }) =>
		activo &&
		css`
			visibility: visible;
			opacity: 1;
			transform: translateY(0);
		`}
`;
