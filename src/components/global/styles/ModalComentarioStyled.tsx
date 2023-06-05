import styled, { css } from "styled-components";

interface ActivaModalProps {
	activo: boolean;
}

export const ModalComentarioStyled = styled.div<ActivaModalProps>`
	position: relative;
	width: 600px;
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
		`};

	& .comentario__titulo {
		font-size: 1.3em;
		color: $colorApp;
		text-align: center;
		font-weight: 600;
	}
	& .comentario__form {
		width: 100%;
		padding: 20px 0;
		display: flex;
		flex-direction: column;
		.comentario__respuesta {
			margin: 10px 0;
			width: 100%;
		}
		#ocultar_id_pro {
			display: none;
		}

		.cali-general {
			width: 100%;
			display: flex;
			align-items: center;

			margin-bottom: 20px;
			label {
				width: 40%;
				font-weight: 500;
			}

			.clasificacion {
				width: 30%;
				margin-right: auto;
				display: flex;
				justify-content: space-around;
				direction: rtl;
				unicode-bidi: bidi-override;
			}
		}
	}
`;
