import axios, { AxiosResponse } from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export class PrivilegioService {
	private id: string;
	private tipo: string;
	private activo: string;
	private abreviatura: string;
	private static url: string = `${API_URL}/privilegio`;

	constructor(id: string, tipo: string, activo: string, abreviatura: string) {
		this.id = id;
		this.tipo = tipo;
		this.activo = activo;
		this.abreviatura = abreviatura;
	}

	static async BuscarPorID(id: string): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					id,
				},
			};
			return await axios.get(`${this.url}/uno`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}
}
