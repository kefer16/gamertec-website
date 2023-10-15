import axios, { AxiosResponse } from "axios";
import { CompraEstadoEntity } from "../entities/compra_estado.entities";


export class CompraEstadoApi {

	async listarTodos(): Promise<AxiosResponse> {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			return await axios.get(`${CompraEstadoEntity.url}/listar_todos`, config);
		} catch (err: any) {
			return Promise.reject(err);
		}
	}

	async listarUno(compra_estado_id: number): Promise<AxiosResponse> {
		try {
			const config = {
				params:{
					compra_estado_id
				},
				headers: {
					"Content-Type": "application/json",
				},
			};

			return await axios.get(`${CompraEstadoEntity.url}/listar_uno`, config);
		} catch (err: any) {
			return Promise.reject(err);
		}
	}

	
}
