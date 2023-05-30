import axios, { AxiosResponse } from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export class ModeloService {
	constructor(
		public modelo_id: number = 0,
		public nombre: string = "",
		public descripcion: string = "",
		public foto: string = "",
		public caracteristicas: string = "",
		public color: string = "",
		public precio: number = 0,
		public fecha_registro: string = "",
		public stock: number = 0,
		public numero_series: string = "",
		public activo: boolean = false,
		public fk_marca: number = 0,
		public fk_categoria: number = 0
	) {}

	private static url: string = `${API_URL}/modelo`;

	static async Registrar(data: ModeloService): Promise<AxiosResponse> {
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
		data: ModeloService
	): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					modelo_id: ID,
				},
				headers: {
					"Content-Type": "application/json",
				},
			};
			const body = JSON.stringify(data);
			console.log(data);

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
					modelo_id: ID,
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
					modelo_id: ID,
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
					modelo_id: ID,
				},
			};
			return await axios.delete(`${this.url}/eliminar`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}

	static async ListarModelosPorFiltro(
		categoria_id: number,
		nombre_modelo: string
	): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					categoria_id,
					nombre_modelo,
				},
			};
			return await axios.get(`${this.url}/listar_filtro`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}
}
