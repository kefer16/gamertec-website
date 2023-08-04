import { PedidoCabeceraEntity } from "../entities/pedido_cabecera.entities";
import { PedidoDetalleEntity } from "../entities/pedido_detalle.entity";
import { PedidoDetalleProductoEntity } from "../entities/pedido_detalle_producto.entity";

export interface PedidoCabeceraSendInterface {
	pedido_cabecera: PedidoCabeceraEntity;
	array_pedido_detalle: PedidoDetalleEntity[];
	array_pedido_detalle_producto: PedidoDetalleProductoEntity[];
}
