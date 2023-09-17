import { Button, Container, TextField } from "@mui/material";
import {
	ComprobanteStyled,
	ModalConfirmacion,
} from "./styles/Comprobante.styled";
import { useContext, useEffect, useState } from "react";
import { CarritoService } from "../../services/carrito.service";
import { CarritoUsuarioProps } from "../../interfaces/carrito.interface";
import {
	convertirFechaSQL,
	convertirFechaVisual,
	convertirFormatoMoneda,
	crearFechaISO,
	fechaActualISO,
} from "../../utils/funciones.utils";
import { GamertecSesionContext } from "../sesion/Sesion.component";
import { PedidoService } from "../../services/pedido.service";

import { useNavigate } from "react-router-dom";
import { RespuestaEntity } from "../../entities/respuesta.entity";
import { PedidoCabeceraEntity } from "../../entities/pedido_cabecera.entities";

import { IPedidoCabeceraInterface } from "../../interfaces/pedido.interface";

export const Comprobante = () => {
	const navegacion = useNavigate();
	const { sesionGamertec, obtenerSesion } = useContext(GamertecSesionContext);

	const [arrayCarrito, setArrayCarrito] = useState<CarritoUsuarioProps[]>([]);

	const [precioSubTotal, setPrecioSubTotal] = useState<number>(0);
	const [precioTotal, setPrecioTotal] = useState<number>(0);
	const [precioEnvio, setPrecioEnvio] = useState<number>(0);

	const [modalConfirmacion, setModalConfirmacion] = useState<boolean>(false);
	const [direccion, setDireccion] = useState<string>("");
	const [telefono, setTelefono] = useState<string>("");
	const [usuarioId, setUsuarioId] = useState<number>(0);
	useEffect(() => {
		const obtenerDatos = async () => {
			obtenerSesion();
			setUsuarioId(sesionGamertec.usuario.usuario_id);
			await CarritoService.listarCaracteristicas(
				sesionGamertec.usuario.usuario_id
			).then((array) => {
				setArrayCarrito(array);
				const precioSubTotal: number = array.reduce(
					(suma, item) => suma + item.cls_modelo.precio * item.cantidad,
					0
				);
				setPrecioSubTotal(precioSubTotal);
				const precioEnvio = 0;
				setPrecioEnvio(precioEnvio);
				const precioTotal: number = precioSubTotal + precioEnvio;
				setPrecioTotal(precioTotal);
			});
			setDireccion(sesionGamertec.usuario.direccion);
			setTelefono(sesionGamertec.usuario.telefono);
		};
		obtenerDatos();
	}, [obtenerSesion, sesionGamertec]);

	const funcionAbrirModal = () => {
		setModalConfirmacion(true);
	};

	const funcionCerrarModal = () => {
		setModalConfirmacion(false);
	};

	const funcionRegistrarPedido = async () => {
		const data: IPedidoCabeceraInterface = {
			distrito_id: 10102,
			usuario_id: usuarioId,
			fecha_registro: convertirFechaSQL(fechaActualISO().toISOString()),
		};

		const pedido: PedidoService = new PedidoService();
		console.log(data);

		await pedido
			.registrar(data)
			.then((resp: RespuestaEntity<PedidoCabeceraEntity>) => {
				if (resp.correcto) {
					navegacion("/order_successful/");
				}
			})
			.catch((error: any) => {
				console.log(error);
			});
	};
	return (
		<>
			<Container maxWidth="lg">
				<ComprobanteStyled className="boleta">
					<div className="titulo">
						<h2>BOLETA DE COMPRA</h2>
						<hr />
					</div>
					<div className="tabla">
						<div className="logo-boleta">
							<img src="" alt="" />
						</div>
						<div className="formulario">
							<div className="form-dividido">
								<TextField
									sx={{ marginBottom: "20px" }}
									disabled
									required
									label="Cliente"
									value={`${sesionGamertec.usuario.nombre} ${sesionGamertec.usuario.apellido}`}
								/>

								<TextField
									sx={{ marginBottom: "20px" }}
									disabled
									required
									label="Fecha"
									value={convertirFechaVisual(crearFechaISO())}
								/>
							</div>
							<div className="form-dividido">
								<TextField
									sx={{ marginBottom: "20px" }}
									disabled
									required
									label="Direccion"
									value={direccion}
								/>
								<TextField
									sx={{ marginBottom: "20px" }}
									disabled
									required
									label="Telefono"
									value={telefono}
								/>
							</div>
						</div>
						<table>
							<thead>
								<th>CANTIDAD</th>
								<th>FOTO</th>
								<th>DESCRIPCIÓN</th>

								<th>PRECIO UNITARIO</th>
								<th>VALOR DE VENTA</th>
							</thead>
							<tbody id="productos-comprar">
								{arrayCarrito.map((carrito: CarritoUsuarioProps) => {
									return (
										<tr key={carrito.carrito_id}>
											<td>{carrito.cantidad}</td>
											<td>
												<img
													src={carrito.cls_modelo.foto}
													alt={carrito.cls_modelo.nombre}
												/>
											</td>

											<td>{`${carrito.cls_modelo.cls_marca.nombre}, ${carrito.cls_modelo.descripcion}, (SN: )`}</td>
											<td>{convertirFormatoMoneda(carrito.cls_modelo.precio)}</td>
											<td>
												{convertirFormatoMoneda(
													carrito.cls_modelo.precio * carrito.cantidad
												)}
											</td>
										</tr>
									);
								})}

								<tr>
									<td colSpan={3}></td>
									<td>SUBTOTAL</td>
									<td id="subtotal">{convertirFormatoMoneda(precioSubTotal)}</td>
								</tr>
								<tr>
									<td colSpan={3}></td>
									<td>COSTO ENVIO</td>
									<td id="envio">{convertirFormatoMoneda(precioEnvio)}</td>
								</tr>
								<tr>
									<td colSpan={3}></td>
									<td>TOTAL</td>
									<td className="total">{convertirFormatoMoneda(precioTotal)}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="boton-comprar">
						<Button onClick={funcionAbrirModal} className="abrir">
							Realizar Pedido
						</Button>
					</div>
				</ComprobanteStyled>
			</Container>
			<ModalConfirmacion
				className={modalConfirmacion ? "active" : ""}
				id="overlay"
			>
				<div className={modalConfirmacion ? "modal active" : "modal"} id="modal">
					<span className="cerrar" id="cerrar" onClick={funcionCerrarModal}>
						x
					</span>
					<h2>¿Seguro que quiere realizar la compra?</h2>
					<p>
						Total a pagar: <span className="total"></span>
					</p>
					<div className="mensaje">El monto total se le descontará de su cuenta</div>
					<div className="botones">
						<button id="comprar" className="si" onClick={funcionRegistrarPedido}>
							Si
						</button>
						<button id="no" className="no">
							No
						</button>
					</div>
				</div>
			</ModalConfirmacion>
		</>
	);
};
