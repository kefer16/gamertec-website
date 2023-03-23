import axios, { AxiosResponse } from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export class UsuarioService {
	private id_usuario: string;
	private nombre: string;
	private apellido_paterno: string;
	private apellido_materno: string;
	private usuario: string;
	private contrasenia: string;
	private dinero: number;
	private foto: string;
	private fecha_registro: Date;
	private activo: boolean;
	private fk_privilegio: number;

	constructor(
		id_usuario: string,
		nombre: string,
		apellido_paterno: string,
		apellido_materno: string,
		usuario: string,
		contrasenia: string,
		dinero: number,
		foto: string,
		activo: boolean,
		fk_privilegio: number
	) {
		this.id_usuario = id_usuario;
		this.nombre = nombre;
		this.apellido_paterno = apellido_paterno;
		this.apellido_materno = apellido_materno;
		this.usuario = usuario;
		this.contrasenia = contrasenia;
		this.dinero = dinero;
		this.foto = foto;
		this.fecha_registro = new Date();
		this.activo = activo;
		this.fk_privilegio = fk_privilegio;
	}

	static async Logearse(
		usuario: string,
		contrasenia: string
	): Promise<AxiosResponse> {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const body = JSON.stringify({ usuario, contrasenia });
			return await axios.post(`${API_URL}/usuario/login`, body, config);
		} catch (err: any) {
			// console.log(err);
			return Promise.reject(err);
		}
	}
}
