import axios, { AxiosResponse } from "axios";

import { ProvinciaEntity } from "../entities/provincia.entity";

export class ProvinciaApi {
	static async Registrar(data: ProvinciaEntity): Promise<AxiosResponse> {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			const body = JSON.stringify(data);

			return await axios.post(`${ProvinciaEntity.url}/registrar`, body, config);
		} catch (err: any) {
			console.log(err);

			return Promise.reject(err);
		}
	}

	static async Actualizar(
		ID: number,
		data: ProvinciaEntity
	): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					provincia_id: ID,
				},
				headers: {
					"Content-Type": "application/json",
				},
			};
			const body = JSON.stringify(data);

			return await axios.put(`${ProvinciaEntity.url}/actualizar`, body, config);
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

			return await axios.get(`${ProvinciaEntity.url}/todos`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}

	static async Historial(ID: number): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					provincia_id: ID,
				},
				headers: {
					"Content-Type": "application/json",
				},
			};

			return await axios.get(`${ProvinciaEntity.url}/historial`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}

	static async BuscarPorID(ID: number): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					provincia_id: ID,
				},
			};
			return await axios.get(`${ProvinciaEntity.url}/uno`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}

	static async EliminarUno(ID: number): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					provincia_id: ID,
				},
			};
			return await axios.delete(`${ProvinciaEntity.url}/eliminar`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}
}
