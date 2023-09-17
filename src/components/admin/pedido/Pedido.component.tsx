import { useContext, useEffect, useState } from "react";
import { CardPedido } from "../../controls/CardPedido";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import { RespuestaEntity } from "../../../entities/respuesta.entity";
import { PedidoService } from "../../../services/pedido.service";

import { PedidoCabeceraUsuarioProsp } from "../../../interfaces/pedido.interface";
import { CardPedidoDetalleProps } from "../../../interfaces/card_pedido.interface";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";

export const Pedido = () => {
	const { sesionGamertec, obtenerSesion } = useContext(GamertecSesionContext);

	const [arrayPedidoCabecera, setArrayPedidoCabecera] = useState<
		PedidoCabeceraUsuarioProsp[]
	>([]);

	useEffect(() => {
		const obtenerData = async () => {
			obtenerSesion();
			const pedido: PedidoService = new PedidoService();

			await pedido
				.listarPedidoUsuario(sesionGamertec.usuario.usuario_id)
				.then((resp: RespuestaEntity<PedidoCabeceraUsuarioProsp[]>) => {
					console.log(resp);

					if (resp.data) {
						setArrayPedidoCabecera(resp.data);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		};

		obtenerData();
	}, [sesionGamertec, obtenerSesion]);

	return (
		<ContainerBodyStyled className="grid gap-3">
			{arrayPedidoCabecera.map((item: PedidoCabeceraUsuarioProsp) => {
				let sumaCantidad: number = 0;
				let sumaPrecio: number = 0;

				const arrayImagenes: string[][] = [];
				item.lst_pedido_detalle.forEach((element: CardPedidoDetalleProps) => {
					sumaCantidad = sumaCantidad + element.cantidad;
					sumaPrecio = sumaPrecio + element.precio;
					if (element.cls_modelo !== undefined) {
						arrayImagenes.push([element.cls_modelo.foto, element.cls_modelo.nombre]);
					}
				});

				return (
					<CardPedido
						key={item.pedido_cabecera_id}
						id={item.pedido_cabecera_id}
						link="/admin/order/detail"
						codigo={item.codigo}
						fechaRegistro={item.fecha_registro}
						cantidadTotal={sumaCantidad}
						precioTotal={sumaPrecio}
						arrayImagenes={arrayImagenes}
					/>
				);
			})}
		</ContainerBodyStyled>
	);
};
