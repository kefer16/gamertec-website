import axios, { AxiosResponse } from "axios";
import { DistritoEntity } from "../entities/distrito.entity";

export class DistritoApi {
	static async Registrar(data: DistritoEntity): Promise<AxiosResponse> {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			const body = JSON.stringify(data);

			return await axios.post(`${DistritoEntity.url}/registrar`, body, config);
		} catch (err: any) {
			console.log(err);

			return Promise.reject(err);
		}
	}

	static async Actualizar(
		ID: number,
		data: DistritoEntity
	): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					distrito_id: ID,
				},
				headers: {
					"Content-Type": "application/json",
				},
			};
			const body = JSON.stringify(data);

			return await axios.put(`${DistritoEntity.url}/actualizar`, body, config);
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

			return await axios.get(`${DistritoEntity.url}/todos`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}

	static async Historial(ID: number): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					distrito_id: ID,
				},
				headers: {
					"Content-Type": "application/json",
				},
			};

			return await axios.get(`${DistritoEntity.url}/historial`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}

	static async BuscarPorID(ID: number): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					distrito_id: ID,
				},
			};
			return await axios.get(`${DistritoEntity.url}/uno`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}

	static async EliminarUno(ID: number): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					distrito_id: ID,
				},
			};
			return await axios.delete(`${DistritoEntity.url}/eliminar`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}
}
