const API_URL = process.env.REACT_APP_API_URL;

export class DistritoEntity {
	constructor(
		public distrito_id: number = 0,
		public nombre: string = "",
		public activo: boolean = false,
		public fk_provincia: number = 0,
		public fk_departamento: number = 0
	) {}

	public static url: string = `${API_URL}/distrito`;
}
