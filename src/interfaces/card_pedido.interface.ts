import { PedidoCabeceraEntity } from "../entities/pedido_cabecera.entities";

export interface CardPedidoInterface {
	pedido_cabecera: PedidoCabeceraEntity;
	link: string;
}
