import { Button } from "primereact/button";
import { Alert, Snackbar, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { ApiModelo } from "../../apis/modelo.api";
import {
	convertirFormatoMoneda,
	fechaActualISO,
	formatoCalificacion,
} from "../../utils/funciones.utils";
import { CircleRounded } from "@mui/icons-material";
import { CloseRounded } from "@mui/icons-material";
import { Comentarios } from "./Comentarios";
import { ComentarioService } from "../../entities/comentario.entities";
import { InterfaceAlertControl } from "../controls/AlertControl";
import { CarritoEntity } from "../../entities/carrito.entities";
import { CarritoApi } from "../../apis/carrito.api";
import { GamertecSesionContext } from "../sesion/Sesion.component";
import { ModeloDescripcionProps } from "../../interfaces/modelo.interface";
import { ContainerBodyStyled } from "../global/styles/ContainerStyled";
import { IconShoppingCartPlus } from "@tabler/icons-react";

interface Props {
	modelo_id: number;
}

const RutaProductos = styled.p`
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

const ContenidoArriba = styled.div`
	margin-top: 25px;
	width: 100%;
	display: flex;
`;

const ContenidoArribaIzquierda = styled.div`
	width: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-right: 1px solid rgba(gray, 0.3);
`;

const ContenidoArribaIzquierdaImagen = styled.img`
	width: 350px;
	height: 350px;
	object-fit: scale-down;
`;

const ContenidoArribaDerecha = styled.div`
	width: 40%;
	margin-left: 5%;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	color: #000;
`;

const Detalles = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const DetallesMarca = styled.div`
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

const DetallesPro = styled.div`
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

const ContenidoAbajo = styled.div`
	width: 100%;
	display: flex;
`;

const AbajoDetalles = styled.div`
	width: 50%;
`;

const DetallesTecnicos = styled.div`
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

interface ActiveModalProps {
	activo: boolean;
}

const FondoOpaco = styled.div<ActiveModalProps>`
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
const ModalInicioSesion = styled.div<ActiveModalProps>`
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

	${({ activo }) =>
		activo &&
		css`
			visibility: visible;
			opacity: 1;
			transform: translateY(0);
		`}

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

const ModalAggregarCarrito = styled.div<ActiveModalProps>`
	position: relative;
	background-color: #fff;
	width: 600px;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	visibility: hidden;
	padding: 30px;
	transform: translateY(-200px);
	transition: 0.5s;

	${({ activo }) =>
		activo &&
		css`
			visibility: visible;
			opacity: 1;
			transform: translateY(0);
		`};

	h1 {
		font-size: 1.3em;
		font-weight: 600;
		color: $colorFondo;
	}

	& .mini-detalles {
		width: 100%;
		display: flex;

		margin-top: 20px;

		& .mini-img {
			width: 20%;
			display: flex;
			justify-content: center;

			img {
				width: 100px;
				object-fit: scale-down;
			}
		}

		& .mini-textos {
			width: 40%;
			@media screen and (max-width: 700px) {
				width: 33%;
			}
			p {
				text-transform: uppercase;
				font-size: 0.9em;
				font-weight: 700;
				color: gray;
			}
		}

		& .mini-precio {
			width: 20%;
			display: flex;
			align-items: center;
			justify-content: center;
			padding-right: 20px;

			h2 {
				font-size: 1em;
				color: #ea2840;
			}
		}

		& .mini-cantidad {
			width: 20%;
			display: flex;
			align-items: center;
			justify-content: space-around;
			@media screen and (max-width: 700px) {
				margin: 20px auto;
				width: 50%;
			}
			button {
				width: 25px;
				height: 25px;
				text-align: center;
				border-radius: 50%;
				border: none;
				background-color: rgba(gray, 0.3);
				outline: none;
				cursor: pointer;

				&.disabled {
					cursor: not-allowed;
				}
			}

			input {
				border: none;
				text-align: center;
				width: 30px;
				height: 30px;
				outline: none;
			}
			p {
				font-size: 0.9em;
			}
		}
	}

	& .mini-botones {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: end;
		.seguir {
			text-decoration: none;
			color: gray;
			font-size: 0.9em;
			transition: 0.5s all;
			margin-right: 15px;

			&:hover {
				text-decoration: underline;
			}
		}
	}
`;

const CerrarLogin = styled(CloseRounded)`
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
	/* box-shadow: 0px 0px -2px -2px gray; */
	background-color: #80808057;
`;

export const Descripcion = ({ modelo_id }: Props) => {
	// const [nombre, setNombre] = useState<string>("");
	const { sesionGamertec, obtenerSesion } = useContext(GamertecSesionContext);
	const [categoriaNombre, setCategoriaNombre] = useState<string>("");
	const [marcaNombre, setMarcaNombre] = useState<string>("");
	const [modeloNombre, setModeloNombre] = useState<string>("");
	const [descripcion, setDescripcion] = useState<string>("");
	const [foto, setFoto] = useState<string>("");
	const [precio, setPrecio] = useState<number>(0);
	const [caracteristicas, setCaracteristicas] = useState<string>("");
	const [color, setColor] = useState<string>("");
	const [stock, setStock] = useState<number>(0);
	const [usuarioId, setUsuarioId] = useState<number>(0);

	const [modalLogin, setModalLogin] = useState<boolean>(false);
	const [modalCarrito, setModalCarrito] = useState<boolean>(false);
	const [modalComentario, setModalComentario] = useState<boolean>(false);
	const [calificacionGeneral, setCalificacionGeneral] = useState<number>(0);
	const [arrayComentarios, setArrayComentarios] = useState<ComentarioService[]>(
		[]
	);
	const [abrirAlerta, setAbrirAlerta] = useState(false);

	const [alerta, setAlerta] = useState<InterfaceAlertControl>({
		active: false,
		type: "info",
		text: "",
	});

	const funcionAsignarAlerta = (
		type: "error" | "warning" | "info" | "success",
		text: string
	) => {
		setAlerta({
			active: true,
			type: type,
			text: text,
		});
	};

	const funcionAbrirAlerta = () => {
		setAbrirAlerta(true);
	};

	const funcionCerrarAlerta = () => {
		setAbrirAlerta(false);
	};

	const funcionObtenerComentarios = async (modelo_id: number) => {
		let arrayComentarios: ComentarioService[] = [];
		await ComentarioService.BuscarPorModelo(modelo_id).then((respuesta) => {
			arrayComentarios = respuesta.data.data;
			setArrayComentarios(arrayComentarios);
		});

		let calificacionGeneral: number =
			arrayComentarios.length === 0
				? 0
				: arrayComentarios.reduce((suma, item) => suma + item.valoracion, 0) / arrayComentarios.length;

		calificacionGeneral = Number(formatoCalificacion(calificacionGeneral));
		setCalificacionGeneral(calificacionGeneral);
	};

	useEffect(() => {
		const ObtenerData = async () => {
			obtenerSesion();
			await ApiModelo.ListarModeloDescripcion(modelo_id).then(
				(data: ModeloDescripcionProps) => {
					setCategoriaNombre(data.cls_marca.cls_categoria.nombre);
					setMarcaNombre(data.cls_marca.nombre);
					setModeloNombre(data.nombre);
					setDescripcion(data.descripcion);
					setFoto(data.foto);
					setPrecio(data.precio);
					setCaracteristicas(data.caracteristicas);
					setColor(data.color);
					setStock(data.stock);
				}
			);
			setUsuarioId(sesionGamertec.usuario.usuario_id);
			await funcionObtenerComentarios(modelo_id);
		};

		ObtenerData();
	}, [modelo_id, obtenerSesion, sesionGamertec]);

	const funcionActivarModalLogin = () => {
		setModalLogin(true);
	};

	const funcionDesactivarModalLogin = () => {
		setModalLogin(false);
	};

	const funcionActivarModalCarrito = () => {
		setModalCarrito(true);
	};

	const funcionDesactivarModalCarrito = () => {
		setModalCarrito(false);
	};

	const funcionActivarModalComentario = () => {
		setModalComentario(true);
	};

	const funcionDesactivarModalComentario = () => {
		setModalComentario(false);
	};

	const [productosCarrito, setProductosCarrito] = useState<number>(1);

	const funcionAmentarProductosCarrito = () => {
		const totalProductosCarrrito = productosCarrito + 1;
		console.log(totalProductosCarrrito);
		const validar =
			totalProductosCarrrito > stock ? stock : totalProductosCarrrito;

		setProductosCarrito(validar);
	};

	const funcionDisminuirProductosCarrito = () => {
		const totalProductosCarrrito = productosCarrito - 1;
		const validar = totalProductosCarrrito <= 1 ? 1 : totalProductosCarrrito;
		setProductosCarrito(validar);
	};

	const funcionAgregarProductoCarrito = async () => {
		const data: CarritoEntity = new CarritoEntity(
			0,
			productosCarrito,
			precio,
			false,
			false,
			fechaActualISO(),
			true,
			usuarioId,
			modelo_id
		);

		await CarritoApi.Registrar(data)
			.then()
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<>
			<ContainerBodyStyled>
				<RutaProductos>{`${categoriaNombre} / ${marcaNombre} / ${modeloNombre}`}</RutaProductos>

				<ContenidoArriba>
					<ContenidoArribaIzquierda>
						<ContenidoArribaIzquierdaImagen src={foto} alt="foto" />
					</ContenidoArribaIzquierda>

					<ContenidoArribaDerecha>
						<Detalles>
							<DetallesMarca>
								<h3 onClick={funcionActivarModalLogin}> {marcaNombre} </h3>
							</DetallesMarca>

							<DetallesPro>
								<h1>{descripcion}</h1>
							</DetallesPro>

							<DetallesPro>
								<h2>{convertirFormatoMoneda(precio)}</h2>
							</DetallesPro>

							<DetallesPro>
								<div className="detalles-envio">
									<h4>Envio Gratis</h4>
									<p>Recíbelo despues de de 7 dias, en tu direccion</p>
								</div>
							</DetallesPro>

							<DetallesPro>
								<p>
									Color: <CircleRounded htmlColor={color} />{" "}
								</p>
							</DetallesPro>

							<DetallesPro>
								<p>{`Unidades disponibles: ${stock}`}</p>
							</DetallesPro>

							<DetallesPro>
								<Button
									icon={<IconShoppingCartPlus className="mr-2" size={24} />}
									onClick={funcionActivarModalCarrito}
									label="Añadir al Carrito"
								/>
							</DetallesPro>
						</Detalles>
					</ContenidoArribaDerecha>
				</ContenidoArriba>

				<ContenidoAbajo>
					<AbajoDetalles>
						<DetallesTecnicos>
							<h1>Detalles del producto</h1>
							<p>{caracteristicas}</p>
						</DetallesTecnicos>
					</AbajoDetalles>
				</ContenidoAbajo>
			</ContainerBodyStyled>
			<Comentarios
				modeloId={modelo_id}
				calificacionGeneral={calificacionGeneral}
				comentarios={arrayComentarios}
				modalComentario={modalComentario}
				funcionObtenerComentarios={funcionObtenerComentarios}
				funcionAbrirModal={funcionActivarModalComentario}
				funcionCerrarModal={funcionDesactivarModalComentario}
				funcionAsignarAlerta={funcionAsignarAlerta}
				funcionAbrirAlerta={funcionAbrirAlerta}
			/>

			<FondoOpaco activo={modalLogin}>
				<ModalInicioSesion activo={modalLogin}>
					<CerrarLogin onClick={funcionDesactivarModalLogin} />

					<h1 className="login__titulo">GamerShop</h1>
					<h2 className="login__subtitulo">Inicio de Sesión</h2>
					<p className="login__saludo">
						Hola! para poder comprar o comentar debes iniciar sesión
					</p>
					<div className="login__mensaje"></div>
					<div className="login__formulario">
						<TextField type="text" placeholder="Usuario" />
						<TextField type="password" placeholder="Contraseña" />
						<Button type="submit" label="Ingresar" />
					</div>

					<p className="login__irregistro">
						¿No tienes cuenta?
						<a href="http://localhost/proyecto_pagina_web/login/registro/">
							Regístrate
						</a>
					</p>
				</ModalInicioSesion>
			</FondoOpaco>
			<FondoOpaco activo={modalCarrito}>
				<ModalAggregarCarrito activo={modalCarrito}>
					<CerrarLogin onClick={funcionDesactivarModalCarrito} />
					<h1>Productos agregados al carrito</h1>

					<div className="mini-detalles">
						<div className="mini-img">
							<img src={foto} alt="" />
						</div>
						<div className="mini-textos">
							<p>{marcaNombre}</p>
							<span>{descripcion}</span>
						</div>
						<div className="mini-precio">
							<h2>{convertirFormatoMoneda(precio)}</h2>
						</div>
						<div id="cantidad" className="mini-cantidad">
							<button id="disminuir" onClick={funcionDisminuirProductosCarrito}>
								-
							</button>
							<input disabled type="number" value={productosCarrito} />
							<button id="aumentar" onClick={funcionAmentarProductosCarrito}>
								+
							</button>
						</div>
					</div>
					<div className="mini-botones">
						<Link className="seguir" to={"/products/"}>
							Seguir comprando
						</Link>
						<Button type="submit" onClick={funcionAgregarProductoCarrito}>
							Ir a carrito
						</Button>
					</div>
				</ModalAggregarCarrito>
			</FondoOpaco>
			<Snackbar
				open={abrirAlerta}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				autoHideDuration={3000}
				onClose={funcionCerrarAlerta}
			>
				<Alert onClose={funcionCerrarAlerta} severity={alerta.type}>
					{alerta.text}
				</Alert>
			</Snackbar>
		</>
	);
};
