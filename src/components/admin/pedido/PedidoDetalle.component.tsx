import { Button, Container, TextField } from "@mui/material";
import { ComprobanteStyled } from "../../comprobante/styles/Comprobante.styled";
import { useContext, useEffect, useState } from "react";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import { PedidoService } from "../../../services/pedido.service";
import { PedidoCabeceraEntity } from "../../../entities/pedido_cabecera.entities";
import { RespuestaEntity } from "../../../entities/respuesta.entity";
import { PedidoDetalleEntity } from "../../../entities/pedido_detalle.entity";
import {
	convertirFechaVisual,
	convertirFormatoMoneda,
} from "../../../utils/funciones.utils";
import { PedidoDetalleProductoEntity } from "../../../entities/pedido_detalle_producto.entity";
import { SeriesRegistro } from "./PedidoDetalleRegistro.component";

interface Props {
	pedido_id: number;
}

export const PedidoDetalle = ({ pedido_id }: Props) => {
	const { sesionGamertec, obtenerSesion } = useContext(GamertecSesionContext);
	const [pedidoCabecera, setPedidoCabecera] = useState<PedidoCabeceraEntity>(
		new PedidoCabeceraEntity()
	);
	const [arrayPedidoDetalle, setArrayPedidoDetalle] = useState<
		PedidoDetalleEntity[]
	>([]);

	const [abrirModal, setAbrirModal] = useState<boolean>(false);

	const funcionCerrarModal = () => {
		setAbrirModal(false);
	};
	const funcionAbrirModal = () => {
		setAbrirModal(true);
	};

	useEffect(() => {
		const obtenerDatos = async () => {
			const pedido: PedidoService = new PedidoService();
			obtenerSesion();
			pedido
				.listarUno(pedido_id)
				.then((resp: RespuestaEntity<PedidoCabeceraEntity>) => {
					console.log(resp);

					if (resp.data) {
						setPedidoCabecera(resp.data);
						setArrayPedidoDetalle(resp.data.array_pedido_detalle ?? []);
					}
				});
		};
		obtenerDatos();
	}, [obtenerSesion, pedido_id]);
	return (
		<>
			<Container maxWidth="lg">
				<ComprobanteStyled className="boleta">
					<div className="titulo">
						<h2>Pedido Pendiente</h2>
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
									value={convertirFechaVisual(pedidoCabecera.fecha_registro)}
								/>
							</div>
							<div className="form-dividido">
								<TextField
									sx={{ marginBottom: "20px" }}
									disabled
									required
									label="Direccion"
									value={pedidoCabecera.direccion}
								/>
								<TextField
									sx={{ marginBottom: "20px" }}
									disabled
									required
									label="Telefono"
									value={pedidoCabecera.telefono}
								/>
							</div>
						</div>
						<table>
							<thead>
								<th>CANTIDAD</th>
								<th>FOTO</th>
								<th>DESCRIPCIÓN</th>
								<th>SERIES</th>
								<th>PRECIO UNITARIO</th>
								<th>VALOR DE VENTA</th>
							</thead>
							<tbody id="productos-comprar">
								{arrayPedidoDetalle.map((pedidoDetalle: PedidoDetalleEntity) => {
									return (
										<tr>
											<td>{pedidoDetalle.cantidad}</td>
											<td>
												<img
													src={pedidoDetalle.modelo?.foto}
													alt={pedidoDetalle.modelo?.nombre}
												/>
											</td>

											<td>{`${pedidoDetalle.modelo?.nombre}`}</td>
											<td>
												{pedidoDetalle.array_pedido_detalle_producto?.map(
													(item: PedidoDetalleProductoEntity) => {
														return `${item.numero_serie}`;
													}
												)}
												<Button variant="contained" onClick={funcionAbrirModal}>
													Agregar
												</Button>
											</td>
											<td>{convertirFormatoMoneda(pedidoDetalle.precio)}</td>
											<td>
												{convertirFormatoMoneda(
													pedidoDetalle.precio * pedidoDetalle.cantidad
												)}
											</td>
										</tr>
									);
								})}

								<tr>
									<td colSpan={4}></td>
									<td>SUBTOTAL</td>
									<td id="subtotal">
										{convertirFormatoMoneda(pedidoCabecera.sub_total)}
									</td>
								</tr>
								<tr>
									<td colSpan={4}></td>
									<td>COSTO ENVIO</td>
									<td id="envio">
										{convertirFormatoMoneda(pedidoCabecera.costo_envio)}
									</td>
								</tr>
								<tr>
									<td colSpan={4}></td>
									<td>TOTAL</td>
									<td className="total">
										{convertirFormatoMoneda(pedidoCabecera.total)}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</ComprobanteStyled>
				<SeriesRegistro
					abrir={abrirModal}
					esEdicion={true}
					arrayDetalleProducto={arrayPedidoDetalle}
					funcionCerrarModal={funcionCerrarModal}
				/>
			</Container>
		</>
	);
};
