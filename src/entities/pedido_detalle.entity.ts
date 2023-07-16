import { ModeloEntity } from "./modelo.entity";

export class PedidoDetalleEntity {
	constructor(
		public pedido_detalle_id: number | null = 0,
		public item: number = 0,
		public cantidad: number = 0,
		public precio: number = 0,
		public total: number = 0,
		public fecha_registro: string = "",
		public activo: boolean = false,
		public fk_modelo: number = 0,
		public fk_pedido_cabecera: number = 0,
		public modelo?: ModeloEntity
	) {}
}
