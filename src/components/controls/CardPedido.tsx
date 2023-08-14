import { useEffect, useState } from "react";
import {
	CardPedidoDetalleProps,
	CardPedidoInterface,
} from "../../interfaces/card_pedido.interface";
import {
	convertirFechaVisual,
	convertirFormatoMoneda,
} from "../../utils/funciones.utils";
import { CardPedidoStyle } from "./styles/CardPedido.style";

export const CardPedido = ({ pedido_cabecera, link }: CardPedidoInterface) => {
	const [cantidadTotal, setCantidadTotal] = useState<number>(0);
	const [precioTotal, setPrecioTotal] = useState<number>(0);
	const [arrayModeloImagenes, setArrayModeloImages] = useState<string[][]>([]);
	useEffect(() => {
		// const sumCantidad = (pedido_cabecera.array_pedido_detalle === undefined ? 0 :  pedido_cabecera.array_pedido_detalle?.reduce((total: number, item: PedidoDetalleEntity) => total + item.cantidad , 0));

		let sumaCantidad: number = 0;
		let sumaPrecio: number = 0;
		const arrayImagenes: string[][] = [];
		pedido_cabecera.lst_pedido_detalle.forEach(
			(element: CardPedidoDetalleProps) => {
				sumaCantidad = sumaCantidad + element.cantidad;
				sumaPrecio = sumaPrecio + element.precio;
				if (element.cls_modelo !== undefined) {
					arrayImagenes.push([element.cls_modelo.foto, element.cls_modelo.nombre]);
				}
			}
		);

		setCantidadTotal(sumaCantidad);
		setPrecioTotal(sumaPrecio);
		setArrayModeloImages(arrayImagenes);
	}, [pedido_cabecera]);

	return (
		<CardPedidoStyle
			to={`${link}/${pedido_cabecera.pedido_cabecera_id}`}
			key={pedido_cabecera.pedido_cabecera_id}
		>
			<div className="codigo">{pedido_cabecera.codigo}</div>
			<div className="detalles_generales">
				<div className="detalles">
					<p>
						<span className="cantidad">{`${cantidadTotal} Produc.`}</span>
					</p>
					<p>
						Total:
						<span>{convertirFormatoMoneda(precioTotal)}</span>
					</p>
					<p>
						Fecha:
						<span>{convertirFechaVisual(pedido_cabecera.fecha_registro)}</span>
					</p>
				</div>
				<div className="previ-productos">
					{arrayModeloImagenes.map((elemento: string[], index: number) => {
						return <img key={index} src={elemento[0]} alt={elemento[1]} />;
					})}
				</div>
			</div>
		</CardPedidoStyle>
	);
};
