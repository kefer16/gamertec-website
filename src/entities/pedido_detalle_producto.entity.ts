export class PedidoDetalleProductoEntity {
	constructor(
		public pedido_detalle_producto_id: number | null = 0,
		public item: number = 0,
		public numero_serie: string = "",
		public fecha_registro: string = "",
		public fk_pedido_detalle: number = 0
	) {}
}
