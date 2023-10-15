const API_URL = process.env.REACT_APP_API_URL;

export class CompraEstadoEntity {
	constructor(
		public compra_estado_id: number = 0,
		public abreviatura: string = "",
		public nombre: string = "",
		public fecha_registro: Date = new Date(),
		public activo: boolean = false,
	) {}
	public static url = `${API_URL}/compra_estado`;
}
