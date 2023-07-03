import { Button, Container } from "@mui/material";
import {
	ComprobanteStyled,
	ModalConfirmacion,
} from "./styles/Comprobante.styled";
import { useEffect, useState } from "react";
import { CarritoService } from "../../services/carrito.service";
import { CarritoCaracteristicasProps } from "../../interfaces/carrito.interface";
import { convertirFormatoMoneda } from "../../utils/funciones.utils";

export const Comprobante = () => {
	const [arrayCarrito, setArrayCarrito] = useState<
		CarritoCaracteristicasProps[]
	>([]);

	const [precioSubTotal, setPrecioSubTotal] = useState<number>(0);
	const [precioTotal, setPrecioTotal] = useState<number>(0);
	const [precioEnvio, setPrecioEnvio] = useState<number>(0);

	const [modalConfirmacion, setModalConfirmacion] = useState<boolean>(false);

	useEffect(() => {
		const obtenerDatos = async () => {
			await CarritoService.listarCaracteristicas(1).then((array) => {
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
		};
		obtenerDatos();
	});

	const funcionAbrirModal = () => {
		setModalConfirmacion(true);
	};

	const funcionCerrarModal = () => {
		setModalConfirmacion(false);
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
								<label htmlFor="">Cliente:</label>
								<input id="cliente" type="text" value="" />
								<label htmlFor="">Fecha:</label>
								<input id="fecha" type="text" value="" />
							</div>
							<div className="form-dividido">
								<label htmlFor="">Dirección:</label>
								<input id="direccion" type="text" value="" />
								<label htmlFor="">Teléfono</label>
								<input id="telefono" type="text" value="" />
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
							Realizar Compra
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
						Total a pagar: <span className="total"></span>{" "}
					</p>
					<div className="mensaje">El monto total se le descontará de su cuenta</div>
					<div className="botones">
						<button id="comprar" className="si">
							{" "}
							Si
						</button>
						<button id="no" className="no">
							{" "}
							No{" "}
						</button>
					</div>
				</div>
			</ModalConfirmacion>
		</>
	);
};
