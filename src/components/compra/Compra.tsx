import { CompraStyled } from "./styles/CompraStyles";
import { useContext, useEffect, useState } from "react";

import { GamertecSesionContext } from "../sesion/Sesion.component";
import { RespuestaEntity } from "../../entities/respuesta.entity";

import {
	ICompraCard,
	ICompraDetalleCard,
} from "../../interfaces/compra.interface";
import { CompraService } from "../../services/compra.service";
import { CardPedido } from "../controls/CardPedido";
import { PedidoService } from "../../services/pedido.service";
import { PedidoCabeceraUsuarioProsp } from "../../interfaces/pedido.interface";
import { CardPedidoDetalleProps } from "../../interfaces/card_pedido.interface";
import { ContainerBodyStyled } from "../global/styles/ContainerStyled";

export const Compra = () => {
	const { sesionGamertec, obtenerSesion } = useContext(GamertecSesionContext);

	const [arrayCompra, setArrayCompra] = useState<ICompraCard[]>([]);
	const [arrayPedido, setArrayPedido] = useState<PedidoCabeceraUsuarioProsp[]>(
		[]
	);

	useEffect(() => {
		const obtenerData = async () => {
			obtenerSesion();
			const usuarioId = sesionGamertec.usuario.usuario_id;
			const compraServ = new CompraService();

			compraServ
				.listarTodos(usuarioId)
				.then((resp: RespuestaEntity<ICompraCard[]>) => {
					if (resp.data) {
						setArrayCompra(resp.data);
					}
				})
				.catch((error) => {
					console.log(error);
				});

			const pedidoServ = new PedidoService();

			pedidoServ
				.listarPedidoUsuario(usuarioId)
				.then((resp: RespuestaEntity<PedidoCabeceraUsuarioProsp[]>) => {
					if (resp.data) {
						setArrayPedido(resp.data);
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
			<ContainerBodyStyled>
				<CompraStyled>
					<div className="titulo">
						<h2>Tus compras</h2>
					</div>

					<div id="contenedor_compras" className="contenedor_compras">
						<h3>Pedidos</h3>
						{arrayPedido.map((item: PedidoCabeceraUsuarioProsp) => {
							let sumaCantidad = 0;
							let sumaPrecio = 0;

							const arrayImagenes: string[][] = [];
							item.lst_pedido_detalle.forEach((element: CardPedidoDetalleProps) => {
								sumaCantidad = sumaCantidad + element.cantidad;
								sumaPrecio = sumaPrecio + element.precio;
								if (element.cls_modelo !== undefined) {
									arrayImagenes.push([
										element.cls_modelo.foto,
										element.cls_modelo.nombre,
									]);
								}
							});

							return (
								<CardPedido
									key={item.pedido_cabecera_id}
									id={item.pedido_cabecera_id}
									link="/buy/order/detail"
									codigo={item.codigo}
									fechaRegistro={item.fecha_registro.toString()}
									cantidadTotal={sumaCantidad}
									precioTotal={sumaPrecio}
									arrayImagenes={arrayImagenes}
								/>
							);
						})}
					</div>

					<div id="contenedor_compras" className="contenedor_compras">
						<h3>Compras</h3>
						{arrayCompra.map((item: ICompraCard) => {
							let sumaCantidad = 0;
							let sumaPrecio = 0;

							const arrayImagenes: string[][] = [];
							item.lst_compra_detalle.forEach((element: ICompraDetalleCard) => {
								sumaCantidad = sumaCantidad + element.cantidad;
								sumaPrecio = sumaPrecio + element.precio;
								if (element.cls_modelo !== undefined) {
									arrayImagenes.push([
										element.cls_modelo.foto,
										element.cls_modelo.nombre,
									]);
								}
							});

							return (
								<CardPedido
									key={item.compra_cabecera_id}
									id={item.compra_cabecera_id}
									link="/buy/detail"
									codigo={item.codigo}
									fechaRegistro={item.fecha_registro.toString()}
									cantidadTotal={sumaCantidad}
									precioTotal={sumaPrecio}
									arrayImagenes={arrayImagenes}
								/>
							);
						})}
					</div>
				</CompraStyled>
			</ContainerBodyStyled>
		</>
	);
};
