import { Container } from "@mui/material";

import { useContext, useEffect, useState } from "react";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { GamertecSesionContext } from "../sesion/Sesion.component";
import { CompraService } from "../../services/compra.service";
import { RespuestaEntity } from "../../entities/respuesta.entity";
import {
	ICompraDetalleTable,
	ICompraTable,
} from "../../interfaces/compra.interface";
import { ComprobanteStyled } from "../comprobante/styles/Comprobante.styled";
import { convertirFormatoMoneda } from "../../utils/funciones.utils";
import { SeriesRegistro } from "../admin/pedido/PedidoDetalleRegistro.component";
import { IMultiSelectProps } from "../controls/primeUI/MultiSelectPrimeUI";
import { ProductoService } from "../../services/producto.service";
import { opcionSerie } from "../../apis/producto.api";
import { IProductoSerie } from "../../interfaces/producto.interface";

interface Props {
	compraCabeceraId: number;
}

export const CompraDetalle = ({ compraCabeceraId }: Props) => {
	const { sesionGamertec, obtenerSesion } = useContext(GamertecSesionContext);
	// const [pedido, setPedido] = useState<IPedidoCabeceraListarUno>(
	// 	{} as IPedidoCabeceraListarUno
	// );
	const [direccion, setDireccion] = useState<string>("");
	const [telefono, setTelefono] = useState<string>("");
	const [compraDetalleId, setCompraDetalleId] = useState<number>(0);
	const [compraDetalle, setCompraDetalle] = useState<ICompraDetalleTable[]>([]);

	const [subTotal, setSubTotal] = useState<number>(0);
	const [costoEnvio, setCostoEnvio] = useState<number>(0);
	const [total, setTotal] = useState<number>(0);

	const [modal, setModal] = useState<boolean>(false);

	const [opciones, setOpciones] = useState<IMultiSelectProps[]>([]);
	const funcionCerrarModal = () => {
		setModal(false);
	};

	const funcionAbrirModal = async (compraDetalleId: number) => {
		const productoServ = new ProductoService();
		let array: IMultiSelectProps[] = [];
		await productoServ
			.obtenerSeries(compraDetalleId, opcionSerie.COMPRA)
			.then((resp: RespuestaEntity<IProductoSerie[]>) => {
				if (resp.data) {
					array = resp.data.map((item) => ({
						name: item.numero_serie,
						selected: item.checked,
						code: String(item.producto_id),
					}));
				}
			});
		setOpciones(array);
		setModal(true);
		setCompraDetalleId(compraDetalleId);
	};

	const obtenerDatos = async (compraCabeceraId: number) => {
		const compraServ = new CompraService();

		compraServ
			.listarUno(compraCabeceraId)
			.then((resp: RespuestaEntity<ICompraTable>) => {
				if (resp.data) {
					setDireccion(resp.data.direccion);
					setTelefono(resp.data.telefono);
					setSubTotal(resp.data.sub_total);
					setCostoEnvio(resp.data.costo_envio);
					setTotal(resp.data.total);
					setCompraDetalle(resp.data.lst_compra_detalle);
				}
			});
	};

	useEffect(() => {
		obtenerSesion();
		obtenerDatos(compraCabeceraId);
	}, [obtenerSesion, compraCabeceraId]);
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
								<label htmlFor="cliente">Cliente</label>
								<InputText
									style={{ marginBottom: "20px" }}
									disabled
									id="cliente"
									value={`${sesionGamertec.usuario.nombre} ${sesionGamertec.usuario.apellido}`}
								/>

								<label htmlFor="fecha">Fecha</label>
								<InputText
									style={{ marginBottom: "20px" }}
									disabled
									id="fecha"
									value={""}
								/>
							</div>
							<div className="form-dividido">
								<label htmlFor="direccion">Direccion</label>
								<InputText
									style={{ marginBottom: "20px" }}
									disabled
									id="direccion"
									value={direccion}
								/>
								<label htmlFor="telefono">Telefono</label>
								<InputText
									style={{ marginBottom: "20px" }}
									disabled
									id="telefono"
									value={telefono}
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
								{compraDetalle.map((item: ICompraDetalleTable) => {
									return (
										<tr key={`PED-DET-${item.item}`}>
											<td>{item.cantidad}</td>
											<td>
												<img src={item.cls_modelo.foto} alt={item.cls_modelo.nombre} />
											</td>

											<td>{`${item.cls_modelo.nombre}`}</td>
											<td>
												<Button
													label="Ver"
													onClick={() => funcionAbrirModal(item.compra_detalle_id)}
												/>
											</td>
											<td>{convertirFormatoMoneda(item.precio)}</td>
											<td>{convertirFormatoMoneda(item.total)}</td>
										</tr>
									);
								})}

								<tr>
									<td colSpan={4}></td>
									<td>SUBTOTAL</td>
									<td id="subtotal">{convertirFormatoMoneda(subTotal)}</td>
								</tr>
								<tr>
									<td colSpan={4}></td>
									<td>COSTO ENVIO</td>
									<td id="envio">{convertirFormatoMoneda(costoEnvio)}</td>
								</tr>
								<tr>
									<td colSpan={4}></td>
									<td>TOTAL</td>
									<td className="total">{convertirFormatoMoneda(total)}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</ComprobanteStyled>
				<SeriesRegistro
					pedidoDetalleId={compraDetalleId}
					opciones={opciones}
					estadoModal={modal}
					funcionCerrarModal={funcionCerrarModal}
					disableButton={true}
				/>
			</Container>
		</>
	);
};
