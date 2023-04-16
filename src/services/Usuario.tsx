import axios, { AxiosResponse } from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export class UsuarioService {
	constructor(
		public usuario_id: number = 0,
		public nombre: string = "",
		public apellido: string = "",
		public correo: string = "",
		public usuario: string = "",
		public contrasenia: string = "",
		public dinero: number = 0,
		public foto: string = "",
		public fecha_registro: string = "",
		public activo: boolean = false,
		public fk_privilegio: number = 0
	) {}
	public index: number = 0;
	private static url: string = `${API_URL}/usuario`;

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
			console.log(err);
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

	static async Actualizar(
		idUsuario: number,
		data_usuario: UsuarioService
	): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					usuario_id: idUsuario,
				},
				headers: {
					"Content-Type": "application/json",
				},
			};
			const body = JSON.stringify(data_usuario);

			return await axios.put(`${this.url}/actualizar`, body, config);
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
}
