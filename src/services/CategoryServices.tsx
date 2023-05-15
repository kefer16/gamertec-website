import axios, { AxiosResponse } from "axios";

const API_URL = process.env.REACT_APP_API_URL;
export class CategoryService {
	constructor(
		public categoria_id: number = 0,
		public nombre: string = "",
		public activo: boolean = false
	) {}
	private static url: string = `${API_URL}/categoria`;

	static async Registrar(data_usuario: CategoryService): Promise<AxiosResponse> {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const body = JSON.stringify(data_usuario);

			return await axios.post(`${this.url}/registrar`, body, config);
		} catch (err: any) {
			console.log(err);

			return Promise.reject(err);
		}
	}

	static async Actualizar(
		id_categoria: number,
		data_usuario: CategoryService
	): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					categoria_id: id_categoria,
				},
				headers: {
					"Content-Type": "application/json",
				},
			};
			const body = JSON.stringify(data_usuario);

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

	static async Historial(id_categoria: number): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					categoria_id: id_categoria,
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
}
