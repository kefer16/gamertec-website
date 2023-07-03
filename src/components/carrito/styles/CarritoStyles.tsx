import styled from "styled-components";

export const CarritoStyles = styled.div`
	position: relative;
	width: 100%;
	min-height: calc(100vh - 60px);
	background-color: rgba(gray, 0.08);

	& .titulo {
		width: 100%;
		display: block;

		& h1 {
			font-size: 1.3em;
			line-height: 3;
			color: $colorTexto;
		}
	}

	& .contenido {
		width: 100%;
		height: auto;
		display: flex;

		& .productos {
			width: 70%;
			padding: 1em 0;
			display: grid;
			grid-template-rows: 1fr;
			gap: 1em;

			& .pro-detalle {
				width: 100%;
				max-height: 145px;
				background-color: white;
				border-radius: 5px;
				padding: 10px;
				box-shadow: 0 0 10px 5px #cccccc40;

				& .deta-arriba {
					width: 100%;
					display: flex;

					& .foto {
						width: 15%;

						display: flex;
						align-items: center;
						justify-content: center;
						& img {
							width: 100px;
							height: 100px;
							object-fit: scale-down;
						}
					}
					& .detalles {
						width: 45%;

						& h2 {
							font-size: 0.8em;
							color: rgba(gray, 0.8);
							font-weight: 700;
						}
						& h1 {
							font-size: 1.5em;
							font-weight: 300;
							line-height: 30px;
						}

						p {
							font-size: 0.7em;
							color: rgba(gray, 0.7);
							font-weight: 600;
							text-transform: uppercase;
						}
					}

					& .precio {
						width: 20%;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						& h2 {
							color: #ea2840;
							font-weight: 600;
							font-size: 1.3em;
						}

						& span {
							color: #45a00a;
							font-weight: 400;
						}
						.stock {
							margin-top: 5px;
							color: #555;
							font-size: 0.9em;
						}
					}

					& .opciones {
						width: 20%;
						display: flex;

						justify-content: center;
						align-items: center;

						.cantidad {
							border: 1px solid rgba(gray, 0.5);
							border-radius: 5px;
							display: flex;
							align-items: center;
							height: 35px;

							input {
								width: 30px;
								color: gray;
								height: 35px;
								text-align: center;
								border: 1px solid rgba(gray, 0.5);
								outline: none;
								font-weight: 400;
							}

							button {
								width: 30px;
								height: 30px;
								text-align: center;
								border: none;
								cursor: pointer;
								background-color: #fff;
								font-weight: 600;
								color: gray;
								outline: none;
							}
						}
					}
				}

				& .cont-botones {
					display: flex;
					justify-content: flex-end;
					align-items: center;
					span {
						color: $color1;
					}
					& .boton {
						display: flex;
						padding: 0 10px;
						align-items: center;
						justify-content: center;

						& a {
							display: flex;
							align-items: center;
							text-decoration: none;
							color: lighten($colorApp, 10%);
							line-height: 2em;
							font-size: 0.75rem;
							font-weight: 300;

							svg {
								width: 18px;
								height: 18px;
								fill: lighten($colorApp, 10%);
								margin-right: 5px;
							}
						}
					}
				}
			}
		}
		.carrito_orden {
			width: 25%;
			height: 300px;
			margin: 1em 0 0 auto;
			padding: 1em;
			border-radius: 5px;
			background-color: white;
			position: sticky;
			top: 80px;

			h1 {
				display: block;
				font-size: 1.1em;
				margin-bottom: 10px;
				text-align: center;
				font-weight: 700;
				color: $colorTexto;
			}

			p {
				display: flex;
				justify-content: space-between;
				font-size: 0.9em;
				color: $colorTexto;
				font-weight: 300;
				line-height: 3;
			}
			hr {
				width: 100%;
				color: rgba(gray, 0.5);
			}
			a {
				display: block;
				margin: 10px 0;
				background-color: $color1;
				color: white;
				padding: 10px;
				text-align: center;
				border-radius: 5px;
				text-decoration: none;
				font-size: 0.9em;
				font-weight: 800;
				text-transform: uppercase;
			}
		}
	}
`;
