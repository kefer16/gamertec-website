import styled from "styled-components";

export const LoginStyles = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 60px);
	width: 100%;
	background: rgb(2, 0, 36);
	background: linear-gradient(
		90deg,
		rgba(2, 0, 36, 1) 0%,
		rgba(103, 103, 181, 1) 40%,
		rgba(0, 212, 255, 1) 100%
	);
	&__img {
		width: 40%;
	}

	&__card {
		width: 60%;
		padding: 20px;
		background-color: #fff;
		border-radius: 10px;
		border: none;
		overflow: hidden;
		&__form {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 1em;

			/* @include box-shadow; */

			&__titles {
				text-align: center;
				&-welcome {
					/* @include form_title; */
				}
				&-subtitle {
					/* @include form_subtitle; */
				}
			}
		}

		&__register {
			width: 100%;
			margin-top: 10px;
			display: flex;
			justify-content: center;
			text-align: center;
			/* @include parraf; */
			&-link {
				margin-left: 10px;
			}
		}
		&__social {
			width: 100%;
			margin-top: 10px;
			display: flex;
			justify-content: space-evenly;
			text-align: center;
			/* @include parraf; */
		}
	}
`;
