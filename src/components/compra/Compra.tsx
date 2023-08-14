import { Link } from "react-router-dom";
import { CompraStyled } from "./styles/CompraStyles";
import { useContext, useEffect, useState } from "react";
import { PedidoService } from "../../services/pedido.service";
import { GamertecSesionContext } from "../sesion/Sesion.component";
import { RespuestaEntity } from "../../entities/respuesta.entity";
import { PedidoCabeceraUsuarioProsp } from "../../interfaces/pedido.interface";

export const Compra = () => {
	const { sesionGamertec, obtenerSesion } = useContext(GamertecSesionContext);

	const [arrayPedidoCabecera, setArrayPedidoCabecera] = useState<
		PedidoCabeceraUsuarioProsp[]
	>([]);

	useEffect(() => {
		const obtenerData = async () => {
			obtenerSesion();
			const pedido: PedidoService = new PedidoService();

			pedido
				.listarPedidoUsuario(sesionGamertec.usuario.usuario_id)
				.then((resp: RespuestaEntity<PedidoCabeceraUsuarioProsp[]>) => {
					if (resp.data) {
						setArrayPedidoCabecera(resp.data);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		};

		obtenerData();
	}, [obtenerSesion, sesionGamertec]);
	return (
		<>
			<CompraStyled>
				<div className="titulo">
					<h2>Tus compras</h2>
				</div>

				{arrayPedidoCabecera ? (
					<div id="contenedor_compras" className="contenedor_compras">
						<h3>Pedidos</h3>

						{/* {arrayPedidoCabecera.map((pedido_cabecera: PedidoCabeceraEntity) => {
							return (
								<Link
									to="#"
									key={pedido_cabecera.pedido_detalle?.pedido_detalle_id}
									className="compra"
								>
									<div className="codigo">{pedido_cabecera.codigo}</div>
									<div className="detalles_generales">
										<div className="detalles">
											<p>
												<span className="cantidad">
													{`${pedido_cabecera.pedido_detalle?.cantidad} Produc.`}{" "}
												</span>
											</p>
											<p>
												Total:{" "}
												<span>
													{convertirFormatoMoneda(pedido_cabecera.pedido_detalle?.precio)}
												</span>
											</p>
											<p>
												Fecha:
												<span>
													{convertirFechaVisual(
														pedido_cabecera.pedido_detalle?.fecha_registro
													)}
												</span>
											</p>
										</div>
										<div className="previ-productos">
											<img src={pedido_cabecera.pedido_detalle?.modelo?.foto} alt="" />
										</div>
									</div>
								</Link>
							);
						})} */}
					</div>
				) : (
					<></>
				)}

				<div id="contenedor_compras" className="contenedor_compras">
					<h3>Compras</h3>
					<Link to="#" className="compra">
						<div className="codigo">001</div>
						<div className="detalles_generales">
							<div className="detalles">
								<p>
									<span className="cantidad">9 Produc.</span>{" "}
								</p>
								<p>
									Total: <span>$900</span>{" "}
								</p>
								<p>
									Fecha: <span> 12/05/2023</span>
								</p>
							</div>
							<div className="previ-productos">
								<img src="#" alt="" />
							</div>
						</div>
					</Link>
				</div>
			</CompraStyled>
		</>
	);
};
