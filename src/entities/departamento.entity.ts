const API_URL = process.env.REACT_APP_API_URL;

export class DepartamentoEntity {
	constructor(
		public departamento_id: number = 0,
		public nombre: string = "",
		public costo_envio: number = 0,
		public activo: boolean = false
	) {}

	public static url: string = `${API_URL}/departamento`;
}
