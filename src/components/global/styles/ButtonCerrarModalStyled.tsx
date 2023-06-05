import styled from "styled-components";
import { CloseRounded } from "@mui/icons-material";

export const ButtonCerrarModalStyled = styled(CloseRounded)`
	position: absolute;
	top: 5px;
	right: 7px;
	width: 25px;
	height: 25px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 3px;
	cursor: pointer;
	transition: 0.5s all;
	border-radius: 50%;
	color: gray;
	background-color: #80808057;
`;
