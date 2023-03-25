import axios, { AxiosResponse } from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export class PrivilegioService {
	private _id_privilegio: string;
	private tipo: string;
	private activo: string;
	private abreviatura: string;
	private static url: string = `${API_URL}/privilegio`;

	constructor(
		id_privilegio: string,
		tipo: string,
		activo: string,
		abreviatura: string
	) {
		this._id_privilegio = id_privilegio;
		this.tipo = tipo;
		this.activo = activo;
		this.abreviatura = abreviatura;
	}

	get id_privilegio(): string {
		return this._id_privilegio;
	}

	set id_privilegio(nuevo_id_privilegio: string) {
		this._id_privilegio = nuevo_id_privilegio;
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
