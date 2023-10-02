import { PedidoCabeceraEntity } from "../entities/pedido_cabecera.entities";
import { PedidoDetalleEntity } from "../entities/pedido_detalle.entity";
import { PedidoDetalleProductoEntity } from "../entities/pedido_detalle_producto.entity";
import { CardPedidoDetalleProps } from "./card_pedido.interface";

export interface PedidoCabeceraSendInterface {
	pedido_cabecera: PedidoCabeceraEntity;
	array_pedido_detalle: PedidoDetalleEntity[];
	array_pedido_detalle_producto: PedidoDetalleProductoEntity[];
}

export interface IPedidoCabeceraInterface {
	usuario_id: number;
	distrito_id: number;
	fecha_registro: string;
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

export interface IPedidoCabeceraListarUno {
	pedido_cabecera_id: number;
	codigo: string;
	direccion: string;
	telefono: string;
	sub_total: number;
	costo_envio: number;
	total: number;
	fecha_registro: Date;
	activo: boolean;
	lst_pedido_detalle: IPedidoDetalleListarUno[];
}

export interface IPedidoDetalleListarUno {
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

export interface IActualizaSerie {
	numero_serie: string;
	fk_producto: number;
}

export interface PedidoPreferencia{
	cantidad: number;
	precio: number;
	cls_modelo: {
		nombre: string;
	};
}

export interface RespuestaPedidoPreferencia{
	id: string
}