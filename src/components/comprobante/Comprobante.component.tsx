import { Button, Container, TextField } from "@mui/material";
import {
	ComprobanteStyled,
	ModalConfirmacion,
} from "./styles/Comprobante.styled";
import { useContext, useEffect, useState } from "react";
import { CarritoService } from "../../services/carrito.service";
import { CarritoCaracteristicasProps } from "../../interfaces/carrito.interface";
import {
	convertirFechaSQL,
	convertirFechaVisual,
	convertirFormatoMoneda,
	crearFechaISO,
} from "../../utils/funciones.utils";
import { GamertecSesionContext } from "../sesion/Sesion.component";
import { PedidoService } from "../../services/pedido.service";

import { useNavigate } from "react-router-dom";
import { RespuestaEntity } from "../../entities/respuesta.entity";
import { PedidoCabeceraEntity } from "../../entities/pedido_cabecera.entities";
import { PedidoDetalleEntity } from "../../entities/pedido_detalle.entity";

export const Comprobante = () => {
	const navegacion = useNavigate();
	const { sesionGamertec, obtenerSesion } = useContext(GamertecSesionContext);

	const [arrayCarrito, setArrayCarrito] = useState<
		CarritoCaracteristicasProps[]
	>([]);

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
					(suma, item) => suma + item.modelo.precio * item.carrito.cantidad,
					0
				);
				setPrecioSubTotal(precioSubTotal);
				const precioEnvio: number = 0;
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
		const fecha_actual: string = convertirFechaSQL(crearFechaISO());

		const pedido: PedidoService = new PedidoService();

		let correlativo: number | null | undefined = 0;

		await pedido
			.ultimo()
			.then((resp: RespuestaEntity<PedidoCabeceraEntity>) => {
				if (resp.correcto) {
					if (resp.data?.pedido_cabecera_id !== undefined) {
						correlativo = resp.data.pedido_cabecera_id;
					}
				}
			})
			.catch((error) => {
				console.log("correlativo", error);
				return;
			});

		const data: PedidoCabeceraEntity = {
			pedido_cabecera_id: null,
			codigo: `PED-${String(correlativo + 1).padStart(6, "0")}`,
			direccion: direccion,
			telefono: telefono,
			sub_total: precioSubTotal,
			costo_envio: precioEnvio,
			total: precioTotal,
			fecha_registro: fecha_actual,
			activo: true,
			fk_distrito: 0,
			fk_usuario: usuarioId,
			array_pedido_detalle: [],
		};
		const array_pedido_detalle: PedidoDetalleEntity[] = [];
		let pedido_detalle: PedidoDetalleEntity = new PedidoDetalleEntity();

		arrayCarrito.forEach(
			(element: CarritoCaracteristicasProps, index: number) => {
				pedido_detalle = {
					pedido_detalle_id: null,
					item: index + 1,
					cantidad: element.carrito.cantidad,
					precio: element.modelo.precio,
					total: Number(element.carrito.cantidad * element.modelo.precio),
					fecha_registro: fecha_actual,
					activo: true,
					fk_modelo: element.modelo.modelo_id,
					fk_pedido_cabecera: 0,
				};
				array_pedido_detalle.push(pedido_detalle);
			}
		);

		data.array_pedido_detalle = array_pedido_detalle;

		await pedido
			.registrar(data)
			.then((resp: RespuestaEntity<PedidoCabeceraEntity>) => {
				if (resp.correcto) {
					navegacion("/order/");
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
								{arrayCarrito.map((carrito: CarritoCaracteristicasProps) => {
									return (
										<tr>
											<td>{carrito.carrito.cantidad}</td>
											<td>
												<img src={carrito.modelo.foto} alt={carrito.modelo.nombre} />
											</td>

											<td>{`${carrito.marca.nombre}, ${carrito.modelo.descripcion}, (SN: )`}</td>
											<td>{convertirFormatoMoneda(carrito.modelo.precio)}</td>
											<td>
												{convertirFormatoMoneda(
													carrito.modelo.precio * carrito.carrito.cantidad
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
				className={modalConfirmacion ? `active` : ``}
				id="overlay"
			>
				<div className={modalConfirmacion ? `modal active` : `modal`} id="modal">
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
