import { UsuarioApi } from "../apis/usuario.api";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { UsuarioEntity } from "../entities/usuario.entities";
import { ActualizaApellidoUsuario, ActualizaCorreoUsuario, ActualizaDireccionUsuario, ActualizaNombreUsuario, LogeoUsuario } from "../interfaces/usuario.interface";

export class UsuarioService {
	private respLogearse = new RespuestaEntity<LogeoUsuario>();
	private respRegistrar = new RespuestaEntity<boolean>();
	private respActualizar = new RespuestaEntity<boolean>();
	private respListarTodo = new RespuestaEntity<UsuarioEntity[]>();
	private respHistorial = new RespuestaEntity<UsuarioEntity[]>();
	private respEliminarUno = new RespuestaEntity<boolean>();

	private respActualizarNombre = new RespuestaEntity<ActualizaNombreUsuario>();
	private respActualizarApellido = new RespuestaEntity<ActualizaApellidoUsuario>();
	private respActualizarCorreo = new RespuestaEntity<ActualizaCorreoUsuario>();
	private respActualizarDireccion = new RespuestaEntity<ActualizaDireccionUsuario>();

	public async logearse(
		usuario: string,
		contrasenia: string
	): Promise<RespuestaEntity<LogeoUsuario>> {
		await UsuarioApi.logearse(usuario, contrasenia).then((resp) => {
			this.respLogearse = {
				correcto: true,
				tipo: "success",
				mensaje: "correcto",
				data: resp.data.data,
			};
		});
		return this.respLogearse;
	}

	public async registrar(
		data: UsuarioEntity
	): Promise<RespuestaEntity<boolean>> {
		await UsuarioApi.registrar(data).then((resp) => {
			this.respRegistrar = {
				correcto: true,
				tipo: "success",
				mensaje: "correcto",
				data: resp.data.data,
			};
		});
		return this.respRegistrar;
	}

	public async actualizar(
		usuario_id: number,
		data: UsuarioEntity
	): Promise<RespuestaEntity<boolean>> {
		await UsuarioApi.actualizar(usuario_id, data).then((resp) => {
			this.respActualizar = {
				correcto: true,
				tipo: "success",
				mensaje: "correcto",
				data: resp.data.data,
			};
		});
		return this.respActualizar;
	}

	public async listarTodos(): Promise<RespuestaEntity<UsuarioEntity[]>> {
		await UsuarioApi.listarTodos().then((resp) => {
			this.respListarTodo = {
				correcto: true,
				tipo: "success",
				mensaje: "correcto",
				data: resp.data.data,
			};
		});
		return this.respListarTodo;
	}

	public async historial(
		idUsuario: number
	): Promise<RespuestaEntity<UsuarioEntity[]>> {
		await UsuarioApi.historial(idUsuario).then((resp) => {
			this.respHistorial = {
				correcto: true,
				tipo: "success",
				mensaje: "correcto",
				data: resp.data.data,
			};
		});
		return this.respHistorial;
	}

	public async eliminarUno(
		usuario_id: number
	): Promise<RespuestaEntity<boolean>> {
		await UsuarioApi.eliminarUno(usuario_id).then((resp) => {
			this.respEliminarUno = {
				correcto: true,
				tipo: "success",
				mensaje: "correcto",
				data: resp.data.data,
			};
		});
		return this.respEliminarUno;
	}

	public async actualizarNombre(
		usuario_id: number,
		data: ActualizaNombreUsuario
	): Promise<RespuestaEntity<ActualizaNombreUsuario>> {
		await UsuarioApi.actualizarNombre(usuario_id, data).then((resp) => {
			this.respActualizarNombre = {
				correcto: true,
				tipo: "success",
				mensaje: "correcto",
				data: resp.data.data,
			};
		});
		return this.respActualizarNombre;
	}

	public async actualizarApellido(
		usuario_id: number,
		data: ActualizaApellidoUsuario
	): Promise<RespuestaEntity<ActualizaApellidoUsuario>> {
		await UsuarioApi.actualizarApellido(usuario_id, data).then((resp) => {
			this.respActualizarApellido = {
				correcto: true,
				tipo: "success",
				mensaje: "correcto",
				data: resp.data.data,
			};
		});
		return this.respActualizarApellido;
	}

	public async actualizarCorreo(
		usuario_id: number,
		data: ActualizaCorreoUsuario
	): Promise<RespuestaEntity<ActualizaCorreoUsuario>> {
		await UsuarioApi.actualizarCorreo(usuario_id, data).then((resp) => {
			this.respActualizarCorreo = {
				correcto: true,
				tipo: "success",
				mensaje: "correcto",
				data: resp.data.data,
			};
		});
		return this.respActualizarCorreo;
	}

	public async actualizarDireccion(
		usuario_id: number,
		data: ActualizaDireccionUsuario
	): Promise<RespuestaEntity<ActualizaDireccionUsuario>> {
		await UsuarioApi.actualizarDireccion(usuario_id, data).then((resp) => {
			this.respActualizarDireccion = {
				correcto: true,
				tipo: "success",
				mensaje: "correcto",
				data: resp.data.data,
			};
		});
		return this.respActualizarDireccion;
	}

}