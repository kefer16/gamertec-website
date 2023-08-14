import axios, { AxiosResponse } from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export class ComentarioService {
	constructor(
		public comentario_id: number = 0,
		public valoracion: number = 0,
		public usuario: string = "",
		public titulo: string = "",
		public mensaje: string = "",
		public fecha_registro: Date = new Date(),
		public activo: boolean = false,
		public fk_usuario: number = 0,
		public fk_modelo: number = 0
	) {}

	private static url: string = `${API_URL}/comentario`;

	static async Registrar(data: ComentarioService): Promise<AxiosResponse> {
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
		data: ComentarioService
	): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					marca_id: ID,
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
					marca_id: ID,
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
					marca_id: ID,
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
					marca_id: ID,
				},
			};
			return await axios.delete(`${this.url}/eliminar`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}

	static async BuscarPorModelo(modelo_id: number): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					modelo_id,
				},
			};
			return await axios.get(`${this.url}/buscar_por_modelo`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}
}
