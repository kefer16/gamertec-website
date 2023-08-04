import { PedidoDetalleEntity } from "./pedido_detalle.entity";
const API_URL = process.env.REACT_APP_API_URL;

export class PedidoCabeceraEntity {
	constructor(
		public pedido_cabecera_id: number | null = 0,
		public codigo: string = "",
		public direccion: string = "",
		public telefono: string = "",
		public sub_total: number = 0,
		public costo_envio: number = 0,
		public total: number = 0,
		public fecha_registro: string = "",
		public activo: boolean = false,
		public fk_distrito: number = 0,
		public fk_usuario: number = 0,
		// public pedido_detalle?: PedidoDetalleEntity,
		public array_pedido_detalle?: PedidoDetalleEntity[]
	) {}
	public static url: string = `${API_URL}/pedido`;
}
