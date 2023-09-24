import styled from "styled-components";

export const PerfilStyled = styled.div`	
	width: 100%;
	position: relative;
	top: 60px;
	& .titulo-principal {
		width: 100%;
		height: 70px;
		margin: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 3px solid rgba(gray, 0.15);
		& h1 {
			margin-left: 20px;
			font-weight: 600;
			font-size: 1.3rem;
			color: rgba($colorTexto, 0.8);
		}

		& span {
			color: $color1;
			text-decoration: none;
			font-weight: 500;
			margin-right: 20px;
		}
	}

	& .detalle {
		width: 100%;
		display: flex;

		& .detalle-imagen {
			width: 40%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			& img {
				width: 280px;
				height: 280px;
				border-radius: 50%;
				box-shadow: 0px 0px 30px 5px rgba(92, 12, 92, 0.5);
				object-fit: cover;
			}

			& a {
				color: $color1;
				text-decoration: none;
				transition: all 0.7;

				&:hover {
					text-decoration: underline;
				}
			}
		}

		& .detalle-contenido {
			width: 60%;

			& .detalle-texto {
				width: 100%;
				margin: auto;

				& .texto {
					width: 100%;
					display: flex;
					justify-content: space-between;
					height: 70px;
					align-items: center;
					border-bottom: 2px solid rgba(gray, 0.15);
					& p {
						font-size: 1em;
						font-weight: 300;
						color: rgba($colorTexto, 0.9);
					}

					& a {
						color: $color1;
						text-decoration: none;
						transition: ease 0.7s;
						font-weight: 300;

						&:hover {
							text-decoration: underline;
						}
					}

					& span {
						color: $color1;
						font-weight: 300;
					}
				}
			}
		}
	}
	
`;
