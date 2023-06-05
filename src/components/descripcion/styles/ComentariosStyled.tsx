import styled from "styled-components";

export const ComentariosStyled = styled.div`
	position: relative;
	top: 60px;
	margin-top: 30px;
	width: 100%;
	max-width: 1300px;
	display: flex;
	flex-direction: column;
	margin: auto;
	background-color: white;
	margin-bottom: 30px;
	.cont-coment {
		width: 95%;
		display: flex;
		flex-direction: column;
		margin: 20px auto;

		.contenedor-cali-general {
			margin-top: 20px;
			width: 100%;
			display: flex;
			flex-direction: column;

			.calificacion-general {
				width: 100%;
				display: flex;
				flex-wrap: wrap;

				.cali {
					margin-top: 10px;
					width: 70%;
					display: flex;
					.estrellas {
						a {
							text-decoration: none;
							color: #ffc83d;
						}
					}
					.cali-numeros {
						padding: 0 10px;
						border-right: 1px solid gray;
					}
					p {
						padding: 0 10px;
					}
				}
				.resenas-producto {
					width: 100%;
					display: flex;
					flex-direction: column;
					margin: 20px auto;
					.num-estrella {
						width: 50%;
						display: flex;
						align-items: center;
						margin: 10px 0;
						p {
							width: 5%;
							min-width: 30px;
							text-align: center;
							span {
								color: #ffc83d;
							}
						}

						.barra_comentarios {
							width: 150px;
							height: 10px;
							margin: 0 20px 0 10px;
							border: 1px solid rgba(grey, 0.3);
							background-color: #ffc83d;
						}
					}
				}
			}
			.btn-comentario {
				width: 30%;
				display: flex;
				align-items: center;
				justify-content: center;
				a {
					text-decoration: none;
					@include botonEnviar;
				}
			}
		}
	}

	.cont-comentarios {
		width: 95%;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1em;
		margin: 20px auto;
		.comentario {
			border-top: 1px solid rgba(gray, 0.5);
			padding: 20px 0;
			width: 100%;
			display: flex;

			.com-izq {
				width: 80%;
				.asunto {
					color: $colorOscuro;
					font-weight: 700;
				}
				.usuario {
					font-size: 0.9em;
					font-weight: 400;
				}
				.clasificacion {
					display: flex;
					justify-content: end;

					direction: rtl;
					unicode-bidi: bidi-override;
					margin-bottom: 10px;
					label {
						color: gray;
					}

					input[type="radio"] {
						display: none;

						&:checked ~ label {
							color: orange;
						}
					}
				}
				.msj {
					p {
						font-weight: 300;
						font-size: 0.9em;
					}
				}
			}
			.fecha-comentario {
				width: 20%;
				display: flex;
				align-items: center;
				justify-content: center;
				p {
					font-size: 0.9em;
					font-weight: 300;
					color: gray;
				}
			}
		}
	}
`;
