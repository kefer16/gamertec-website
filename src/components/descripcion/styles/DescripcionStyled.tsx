import styled from "styled-components";

export const RutaProductos = styled.p`
	width: 100%;
	height: 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: rgba(gray, 0.4);
	font-size: 0.9em;
	margin-left: 40px;
	color: rgba(#000, 0.8);
	text-transform: uppercase;
	font-weight: 300;
`;

export const ContenidoArriba = styled.div`
	margin-top: 25px;
	width: 100%;
	display: flex;
`;

export const ContenidoArribaIzquierda = styled.div`
	width: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-right: 1px solid rgba(gray, 0.3);
`;

export const ContenidoArribaIzquierdaImagen = styled.img`
	width: 350px;
	height: 350px;
	object-fit: scale-down;
`;

export const ContenidoArribaDerecha = styled.div`
	width: 40%;
	margin-left: 5%;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	color: #000;
`;

export const Detalles = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const DetallesMarca = styled.div`
	margin-bottom: 5px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	& h3 {
		font-size: 0.8em;
		padding: 1px 10px;
		background-color: #80808083;
		color: white;
		font-weight: 600;
	}
`;

export const DetallesPro = styled.div`
	width: 100%;

	& h1 {
		font-weight: 200;
		font-size: 1.8em;
		line-height: 1;
	}

	& h2 {
		color: #ea2840;
		font-size: 1.4em;
		font-weight: 600;
		line-height: 2;
	}

	& h3 {
		font-size: 1em;
		color: rgb(100, 96, 96);
		font-weight: 500;
	}

	& p {
		padding: 10px 0 5px;
		font-size: 0.9em;
		display: flex;
		align-items: center;
		font-weight: 300;
	}
	& h4 {
		display: flex;
		align-items: center;
		color: #45a00a;
	}

	& a {
		margin-top: 20px;

		width: 210px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

export const ContenidoAbajo = styled.div`
	width: 100%;
	display: flex;
`;

export const AbajoDetalles = styled.div`
	width: 50%;
`;

export const DetallesTecnicos = styled.div`
	width: 90%;
	margin: auto;

	& h1 {
		color: $colorTexto;
		font-weight: 600;
		font-size: 1.4em;
		line-height: 2;
		border-bottom: 1px solid rgba(gray, 0.3);
	}

	& p {
		margin: 20px 0;
		color: #333333;
		font-size: 0.93em;
		font-weight: 300;
	}
`;

export const FondoOpaco = styled.div<ActiveModalProps>`
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
	
`;
export const ModalInicioSesion = styled.div<ActiveModalProps>`
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

	

	& .login__titulo {
		font-size: 1.7em;
		color: $colorApp;
		font-family: "Audiowide", cursive;
		margin-bottom: 30px;
	}
	& .login__subtitulo {
		text-transform: uppercase;
		font-size: 0.9em;
		color: $colorTexto;
		margin-bottom: 10px;
	}
	& .login__saludo {
		font-size: 0.9em;
		text-align: center;
		font-weight: 300;
		margin-bottom: 10px;
	}

	& .login__formulario {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 100%;
		min-height: 150px;
		margin: auto;

		input {
			@include inputs;
		}
		input[type="submit"] {
			@include botonEnviar;
		}
	}
	& .login__mensaje {
		width: 100%;
		min-height: 30px;
	}

	& .login__irregistro {
		margin-top: 10px;
		font-size: 0.9em;
		margin-left: auto;
		font-weight: 300;

		span {
			color: #6c63ff;
		}
	}
`;



interface ActiveModalProps {
	activo: boolean;
}