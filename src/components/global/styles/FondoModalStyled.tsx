import styled, { css } from "styled-components";

export interface ActiveModalProps {
	activo: boolean;
}

export const FondoModalStyled = styled.div<ActiveModalProps>`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #000000a3;
	visibility: hidden;
	opacity: 0;
	transition: 0.4s all;
	z-index: 8;
	${({ activo }) =>
		activo &&
		css`
			visibility: visible;
			opacity: 1;
			overflow: hidden;
		`}
`;
