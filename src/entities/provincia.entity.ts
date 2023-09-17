const API_URL = process.env.REACT_APP_API_URL;

export class ProvinciaEntity {
	constructor(
		public provincia_id: number = 0,
		public nombre: string = "",
		public activo: boolean = false,
		public fk_departamento: number = 0
	) {}

	public static url = `${API_URL}/provincia`;
}
