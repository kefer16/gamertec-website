import axios, { AxiosResponse } from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export class UsuarioService {
	private _id_usuario: string;
	private _nombre: string;
	private _apellido: string;
	private _correo: string;
	private _usuario: string;
	private _contrasenia: string;
	private _dinero: number;
	private _foto: string;
	private _fecha_registro: string;
	private _activo: boolean;
	private _fk_privilegio: string;

	private static url: string = `${API_URL}/usuario`;

	constructor(
		id_usuario: string = "",
		nombre: string = "",
		apellido: string = "",
		correo: string = "",
		usuario: string = "",
		contrasenia: string = "",
		dinero: number = 0,
		foto: string = "",
		fecha_registro: string = "",
		activo: boolean = false,
		fk_privilegio: string = ""
	) {
		this._id_usuario = id_usuario;
		this._nombre = nombre;
		this._apellido = apellido;
		this._correo = correo;
		this._usuario = usuario;
		this._contrasenia = contrasenia;
		this._dinero = dinero;
		this._foto = foto;
		this._fecha_registro = fecha_registro;
		this._activo = activo;
		this._fk_privilegio = fk_privilegio;
	}

	get usuario(): string {
		return this._usuario;
	}

	set usuario(usuario: string) {
		this._usuario = usuario;
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
			return await axios.post(`${this.url}/login`, body, config);
		} catch (err: any) {
			// console.log(err);
			return Promise.reject(err);
		}
	}

	static async Registrar(data_usuario: UsuarioService): Promise<AxiosResponse> {
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

	static LeerSesionStorage(): UsuarioService {
		const usuarioJSON = sessionStorage.getItem("gamertec-user");
		let usuario: UsuarioService = new UsuarioService();
		if (usuarioJSON !== null) {
			usuario = JSON.parse(usuarioJSON);
		}

		return usuario;
	}
}
