import axios, { AxiosResponse } from "axios";
import { CarritoEntity } from "../entities/carrito.entities";

export class CarritoApi {
	static async Registrar(data: CarritoEntity): Promise<AxiosResponse> {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			const body = JSON.stringify(data);

			return await axios.post(`${CarritoEntity.url}/registrar`, body, config);
		} catch (err: any) {
			console.log(err);

			return Promise.reject(err);
		}
	}

	static async Actualizar(
		ID: number,
		data: CarritoEntity
	): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					carrito_id: ID,
				},
				headers: {
					"Content-Type": "application/json",
				},
			};
			const body = JSON.stringify(data);

			return await axios.put(`${CarritoEntity.url}/actualizar`, body, config);
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

			return await axios.get(`${CarritoEntity.url}/todos`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}

	static async Historial(ID: number): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					carrito_id: ID,
				},
				headers: {
					"Content-Type": "application/json",
				},
			};

			return await axios.get(`${CarritoEntity.url}/historial`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}

	static async BuscarPorID(ID: number): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					carrito_id: ID,
				},
			};
			return await axios.get(`${CarritoEntity.url}/uno`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}

	static async EliminarUno(ID: number): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					carrito_id: ID,
				},
			};
			return await axios.delete(`${CarritoEntity.url}/eliminar`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}

	static async ObtenerCarritoPorUsuario(
		usuario_id: number
	): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					usuario_id,
				},
			};
			return await axios.get(
				`${CarritoEntity.url}/obtener_carrito_por_usuario`,
				config
			);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}
}
