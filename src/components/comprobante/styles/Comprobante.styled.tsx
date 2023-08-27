import styled from "styled-components";

export const ComprobanteStyled = styled.div`
	.titulo {
		width: 100%;
		h2 {
		}
	}

	.tabla {
		margin-top: 20px;
		.logo-boleta {
			background-color: #222222;
			display: flex;
			justify-content: center;
			img {
				width: 300px;
			}
		}

		.formulario {
			margin: 10px 0;
			width: 100%;
			display: flex;
			justify-content: start;

			.form-dividido {
				width: 40%;
				display: flex;
				margin-right: 20px;

				flex-direction: column;
				/* label {
						@include labels;
					}
					input {
						@include inputs;
					} */
			}
		}
		table {
			width: 100%;

			th {
				background-color: #222222;
				color: #fff;
				padding: 10px;
			}
			td {
				text-align: center;
				padding: 10px;
				background-color: rgba(gray, 0.1);
				img {
					width: 100px;
				}
			}
		}
		.boton-comprar {
			width: 100%;
			display: flex;
			justify-content: center;
			padding: 20px 0;
			/* button {
					@include botonEnviar;
				} */
		}
	}
`;

export const ModalConfirmacion = styled.div`
	/* .overlay { */
	position: fixed;
	z-index: 9;
	width: 100%;
	height: 100%;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.5);
	visibility: hidden;
	opacity: 0;
	transition: 0.4s all;

	&.active {
		visibility: visible;
		opacity: 1;
		overflow: hidden;
	}

	.modal {
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
		&.active {
			visibility: visible;
			opacity: 1;
			transform: translateY(0);
		}

		.cerrar {
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
			color: gray;
			transition: 0.5s all;
			border-radius: 50%;
			&:hover {
				box-shadow: 0px 0px -2px -2px gray;
				background-color: rgba(gray, 0.15);
				cursor: pointer;
			}

			svg {
				width: 23px;
				fill: gray;
			}
		}

		h2 {
			font-size: 1.3em;
			color: $colorApp;
			text-align: center;
			font-weight: 600;
		}
		p {
			/* @include parrafoOscuro; */
			margin: 20px 0 0;
		}
		.mensaje {
			/* @include parrafoOscuro; */
			color: $error;
			font-size: 0.7em;
			margin-bottom: 20px;
		}
		.botones {
			width: 100%;
			display: flex;
			justify-content: space-evenly;
		}
		button {
			/* @include botonEnviar; */
			padding: 7px 20px;
		}
	}
	/* } */
`;
