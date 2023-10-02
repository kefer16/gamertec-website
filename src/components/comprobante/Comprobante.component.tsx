import { ComprobanteStyled } from "./styles/Comprobante.styled";
import { useContext, useEffect, useState } from "react";
import { CarritoService } from "../../services/carrito.service";
import { CarritoUsuarioProps } from "../../interfaces/carrito.interface";
import {
	// convertirFechaSQL,
	convertirFechaVisual,
	convertirFormatoMoneda,
	crearFechaISO,
	// fechaActualISO,
} from "../../utils/funciones.utils";
import { GamertecSesionContext } from "../sesion/Sesion.component";
import { PedidoService } from "../../services/pedido.service";

// import { useNavigate } from "react-router-dom";
import { RespuestaEntity } from "../../entities/respuesta.entity";
// import { PedidoCabeceraEntity } from "../../entities/pedido_cabecera.entities";

import { PedidoPreferencia, RespuestaPedidoPreferencia } from "../../interfaces/pedido.interface";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { SesionGamertec } from "../../interfaces/sesion.interface";
import { ContainerBodyStyled } from "../global/styles/ContainerStyled";
import { InputText } from "primereact/inputtext";
initMercadoPago(process.env.REACT_APP_MERCADO_PAGO_PUBLIC_KEY || "");

export const Comprobante = () => {
	// const navegacion = useNavigate();
	const { sesionGamertec, obtenerSesion } = useContext(GamertecSesionContext);
	const [preferenciaId, setPreferenciaId] = useState<string>("");
	const [arrayCarrito, setArrayCarrito] = useState<CarritoUsuarioProps[]>([]);

	const [precioSubTotal, setPrecioSubTotal] = useState<number>(0);
	const [precioTotal, setPrecioTotal] = useState<number>(0);
	const [precioEnvio, setPrecioEnvio] = useState<number>(0);

	useEffect(() => {
		obtenerSesion();
		obtenerDatosCarrito(sesionGamertec);
	}, [obtenerSesion, sesionGamertec]);

	const obtenerDatosCarrito = async (sesion: SesionGamertec) => {
		let _arrayCarrito: CarritoUsuarioProps[] = [];
		await CarritoService.listarCaracteristicas(sesion.usuario.usuario_id).
			then((array) => {
				_arrayCarrito = [...array];
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

		console.log(preferenciaId, !preferenciaId);

		if (!preferenciaId) {
			funcionRegistrarPedido(_arrayCarrito);
		}

	};


	const funcionRegistrarPedido = async (arrayCarrito: CarritoUsuarioProps[]) => {
		// const data: IPedidoCabeceraInterface = {
		// 	distrito_id: 10102,
		// 	usuario_id: usuarioId,
		// 	fecha_registro: convertirFechaSQL(fechaActualISO().toISOString()),
		// };

		const pedServ: PedidoService = new PedidoService();

		const itemsPreferencia: PedidoPreferencia[] = [];

		arrayCarrito.forEach((element: CarritoUsuarioProps) => {
			itemsPreferencia.push({ cls_modelo: { nombre: element.cls_modelo.nombre }, cantidad: element.cantidad, precio: element.cls_modelo.precio });
		});

		await pedServ.crearPreferencia(itemsPreferencia)
			.then((resp: RespuestaEntity<RespuestaPedidoPreferencia>) => {
				if (resp.data) {
					setPreferenciaId(resp.data.id);
				}
			})
			.catch((error: any) => {
				console.log(error);
			});
	};


	return (
		<>
			<ContainerBodyStyled>
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

								<InputText
									// className="w-full mb-3"
									value={`${sesionGamertec.usuario.nombre} ${sesionGamertec.usuario.apellido}`}
									type="text"
									autoComplete="none"
									disabled
								/>

								<InputText
									// className="w-full mb-3"
									value={convertirFechaVisual(crearFechaISO())}
									type="text"
									autoComplete="none"
									disabled
								/>
							</div>
							<div className="form-dividido">
								<InputText
									// className="w-full mb-3"
									value={sesionGamertec.usuario.direccion}
									type="text"
									autoComplete="none"
									disabled
								/>

								<InputText
									// className="w-full mb-3"
									value={sesionGamertec.usuario.telefono}
									type="text"
									autoComplete="none"
									disabled
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
						{preferenciaId && <Wallet locale="es-PE" initialization={{ preferenceId: preferenciaId }} />}
					</div>
				</ComprobanteStyled>
			</ContainerBodyStyled>

		</>
	);
};
