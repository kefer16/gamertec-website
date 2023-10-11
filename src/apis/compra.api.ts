import axios, { AxiosResponse } from "axios";
import { CompraCabeceraEntity } from "../entities/compra_cabecera.entity";
import { CompraRegistra } from "../interfaces/compra.interface";

export class CompraApi {
	public async listarTodos(usuario_id: number): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					usuario_id,
				},
				headers: {
					"Content-Type": "application/json",
				},
			};
			return await axios.get(`${CompraCabeceraEntity.url}/todos`, config);
		} catch (err: any) {
			console.log(err);

			return Promise.reject(err);
		}
	}

	public async listarUno(compra_cabecera_id: number): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					compra_cabecera_id,
				},
				headers: {
					"Content-Type": "application/json",
				},
			};
			return await axios.get(`${CompraCabeceraEntity.url}/uno`, config);
		} catch (err: any) {
			console.log(err);

			return Promise.reject(err);
		}
	}
	public async registrar(data: CompraRegistra): Promise<AxiosResponse> {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
				
			};
			const body = JSON.stringify(data);
			return await axios.post(`${CompraCabeceraEntity.url}/registrar`, body, config);
		} catch (err: any) {
		
			return Promise.reject(err);
		}
	}
}
