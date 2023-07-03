import styled from "styled-components";

export const CompraStyled = styled.div`
	max-width: 1260px;
	min-height: calc(100vh - 60px);
	margin: auto;
	background-color: #fff;
	.titulo {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		h1 {
			font-family: "Audiowide";
			margin: 30px;
		}
	}

	.contenedor_compras {
		display: grid;
		padding: 1em;
		grid-template-columns: 1fr;
		gap: 1em;

		.compra {
			width: 100%;
			border-radius: 7px;
			background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
			// background-color: red;
			display: flex;
			padding: 30px;
			flex-direction: column;
			text-decoration: none;
			.codigo {
				color: #fff;
				font-weight: 800;
				margin-bottom: 10px;
			}
			.detalles_generales {
				width: 100%;
				display: flex;
				align-items: center;
				.detalles {
					width: 50%;
					display: flex;

					p {
						margin-right: 20px;
						color: #fff;
						font-weight: 700;
						span {
							font-weight: 300;
						}
					}
					.cantidad {
						font-weight: 700;
					}
				}
				.previ-productos {
					display: grid;

					width: 50%;
					grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
					grid-template-rows: 70px;
					gap: 0.5em;

					img {
						width: 70px;
						height: 70px;
						box-shadow: 0 0 12px rgba(#fff, 0.5);
						padding: 2px;
						border-radius: 50%;
						object-fit: cover;
					}
				}
			}
		}
	}
`;
