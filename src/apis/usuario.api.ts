import axios, { AxiosResponse } from "axios";
import { UsuarioEntity } from "../entities/usuario.entities";

export class UsuarioApi {
	static async logearse(
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
			return await axios.post(`${UsuarioEntity.url}/login`, body, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}

	static async registrar(data: UsuarioEntity): Promise<AxiosResponse> {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const body = JSON.stringify(data);

			return await axios.post(`${UsuarioEntity.url}/registrar`, body, config);
		} catch (err: any) {
			console.log(err);

			return Promise.reject(err);
		}
	}

	static async actualizar(
		ID: number,
		data: UsuarioEntity
	): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					usuario_id: ID,
				},
				headers: {
					"Content-Type": "application/json",
				},
			};
			const body = JSON.stringify(data);

			return await axios.put(`${UsuarioEntity.url}/actualizar`, body, config);
		} catch (err: any) {
			console.log(err);

			return Promise.reject(err);
		}
	}

	// static LeerSesionStorage(): UsuarioEntity {
	// 	const usuarioJSON = sessionStorage.getItem("gamertec-user");
	// 	let usuario: UsuarioEntity = new UsuarioEntity();
	// 	if (usuarioJSON !== null) {
	// 		usuario = JSON.parse(usuarioJSON);
	// 	}

	// 	return usuario;
	// }

	static async listarTodos(): Promise<AxiosResponse> {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			return await axios.get(`${UsuarioEntity.url}/todos`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}

	static async historial(idUsuario: number): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					usuario_id: idUsuario,
				},
				headers: {
					"Content-Type": "application/json",
				},
			};

			return await axios.get(`${UsuarioEntity.url}/historial`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}

	static async eliminarUno(ID: number): Promise<AxiosResponse> {
		try {
			const config = {
				params: {
					usuario_id: ID,
				},
			};
			return await axios.delete(`${UsuarioEntity.url}/eliminar`, config);
		} catch (err: any) {
			console.log(err);
			return Promise.reject(err);
		}
	}

	
}