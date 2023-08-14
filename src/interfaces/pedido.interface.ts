import { PedidoCabeceraEntity } from "../entities/pedido_cabecera.entities";
import { PedidoDetalleEntity } from "../entities/pedido_detalle.entity";
import { PedidoDetalleProductoEntity } from "../entities/pedido_detalle_producto.entity";
import { CardPedidoDetalleProps } from "./card_pedido.interface";

export interface PedidoCabeceraSendInterface {
	pedido_cabecera: PedidoCabeceraEntity;
	array_pedido_detalle: PedidoDetalleEntity[];
	array_pedido_detalle_producto: PedidoDetalleProductoEntity[];
}

export interface PedidoCabeceraUsuarioProsp {
	pedido_cabecera_id: number;
	codigo: string;
	sub_total: number;
	costo_envio: number;
	total: number;
	fecha_registro: string;
	activo: boolean;
	lst_pedido_detalle: CardPedidoDetalleProps[];
}
