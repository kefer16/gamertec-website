import axios, { AxiosResponse } from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export class PrivilegioService {
	constructor(
		public privilegio_id: number = 0,
		public tipo: string = "",
		public activo: boolean = false,
		public abreviatura: string = "",
		public fecha_registro: Date = new Date()
	) {}

	private static url: string = `${API_URL}/privilegio`;

	static async Registrar(data: PrivilegioService): Promise<AxiosResponse> {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			const body = JSON.stringify(data);

			return await axios.post(`${this.url}/registrar`, body, config);
		} catch (err: any) {
			console.log(err);

			return Promise.reject(err);
		}
	}

	static async Actualizar(
		ID: number,
		data: PrivilegioService
	): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					privilegio_id: ID,
				},
				headers: {
					"Content-Type": "application/json",
				},
			};
			const body = JSON.stringify(data);

			return await axios.put(`${this.url}/actualizar`, body, config);
		} catch (err: any) {
			console.log(err);

			return Promise.reject(err);
		}
	}

	static async ListarTodos(): Promise<AxiosResponse> {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			return await axios.get(`${this.url}/todos`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}

	static async Historial(ID: number): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					categoria_id: ID,
				},
				headers: {
					"Content-Type": "application/json",
				},
			};

			return await axios.get(`${this.url}/historial`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}

	static async BuscarPorID(ID: number): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					privilegio_id: ID,
				},
			};
			return await axios.get(`${this.url}/uno`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}
	static async EliminarUno(ID: number): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					privilegio_id: ID,
				},
			};
			return await axios.delete(`${this.url}/eliminar`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}
}
