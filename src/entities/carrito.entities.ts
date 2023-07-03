const API_URL = process.env.REACT_APP_API_URL;

export class CarritoEntity {
	constructor(
		public carrito_id: number = 0,
		public cantidad: number = 0,
		public precio_total: number = 0,
		public despues: number = 0,
		public comprado: number = 0,
		public fecha_registro: string = "",
		public activo: boolean = false,
		public fk_usuario: number = 0,
		public fk_modelo: number = 0
	) {}

	public static url: string = `${API_URL}/carrito`;
}
