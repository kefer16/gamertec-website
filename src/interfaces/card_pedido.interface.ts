import { PedidoCabeceraUsuarioProsp } from "./pedido.interface";

export interface CardPedidoInterface {
	pedido_cabecera: PedidoCabeceraUsuarioProsp;
	link: string;
}

export interface CardPedidoDetalleProps {
	pedido_detalle_id: number;
	item: number;
	cantidad: number;
	precio: number;
	total: number;
	fecha_registro: Date;
	activo: boolean;
	cls_modelo: {
		modelo_id: number;
		nombre: string;
		descripcion: string;
		foto: string;
	};
}
