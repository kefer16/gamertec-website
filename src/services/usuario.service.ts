import { UsuarioApi } from "../apis/usuario.api";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { UsuarioEntity } from "../entities/usuario.entities";
import {
   ActualizaApellidoUsuario,
   ActualizaContraseniaUsuario,
   ActualizaCorreoUsuario,
   ActualizaDireccionUsuario,
   ActualizaFotoUsuario,
   ActualizaNombreUsuario,
   LogeoUsuario,
} from "../interfaces/usuario.interface";

export class UsuarioService {
   private respLogearse = new RespuestaEntity<LogeoUsuario>();
   private respRegistrar = new RespuestaEntity<boolean>();
   private respActualizar = new RespuestaEntity<boolean>();
   private respListarTodo = new RespuestaEntity<UsuarioEntity[]>();
   private respHistorial = new RespuestaEntity<UsuarioEntity[]>();
   private respEliminarUno = new RespuestaEntity<boolean>();

   private respActualizarNombre = new RespuestaEntity<ActualizaNombreUsuario>();
   private respActualizarApellido =
      new RespuestaEntity<ActualizaApellidoUsuario>();
   private respActualizarCorreo = new RespuestaEntity<ActualizaCorreoUsuario>();
   private respActualizarDireccion =
      new RespuestaEntity<ActualizaDireccionUsuario>();
   private respActualizarFoto = new RespuestaEntity<ActualizaFotoUsuario>();
   private respActualizarContrasenia = new RespuestaEntity<boolean>();

   private _apiUsuario = new UsuarioApi();

   public async logearse(
      usuario: string,
      contrasenia: string
   ): Promise<RespuestaEntity<LogeoUsuario>> {
      await UsuarioApi.logearse(usuario, contrasenia).then((resp) => {
         this.respLogearse = {
            code: resp.data.code,
            data: resp.data.data,
            error: resp.data.error,
         };
      });
      return this.respLogearse;
   }

   public async registrar(
      data: UsuarioEntity
   ): Promise<RespuestaEntity<boolean>> {
      await UsuarioApi.registrar(data).then((resp) => {
         this.respRegistrar = {
            code: resp.data.code,
            data: resp.data.data,
            error: resp.data.error,
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
            code: resp.data.code,
            data: resp.data.data,
            error: resp.data.error,
         };
      });
      return this.respActualizar;
   }

   public async listarTodos(): Promise<RespuestaEntity<UsuarioEntity[]>> {
      await UsuarioApi.listarTodos().then((resp) => {
         this.respListarTodo = {
            code: resp.data.code,
            data: resp.data.data,
            error: resp.data.error,
         };
      });
      return this.respListarTodo;
   }

   public async historial(
      idUsuario: number
   ): Promise<RespuestaEntity<UsuarioEntity[]>> {
      await UsuarioApi.historial(idUsuario).then((resp) => {
         this.respHistorial = {
            code: resp.data.code,
            data: resp.data.data,
            error: resp.data.error,
         };
      });
      return this.respHistorial;
   }

   public async eliminarUno(
      usuario_id: number
   ): Promise<RespuestaEntity<boolean>> {
      await UsuarioApi.eliminarUno(usuario_id).then((resp) => {
         this.respEliminarUno = {
            code: resp.data.code,
            data: resp.data.data,
            error: resp.data.error,
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
            code: resp.data.code,
            data: resp.data.data,
            error: resp.data.error,
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
            code: resp.data.code,
            data: resp.data.data,
            error: resp.data.error,
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
            code: resp.data.code,
            data: resp.data.data,
            error: resp.data.error,
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
            code: resp.data.code,
            data: resp.data.data,
            error: resp.data.error,
         };
      });
      return this.respActualizarDireccion;
   }

   public async actualizarFoto(
      usuario_id: number,
      data: ActualizaFotoUsuario
   ): Promise<RespuestaEntity<ActualizaFotoUsuario>> {
      await this._apiUsuario.actualizarFoto(usuario_id, data).then((resp) => {
         this.respActualizarFoto = {
            code: resp.data.code,
            data: resp.data.data,
            error: resp.data.error,
         };
      });
      return this.respActualizarFoto;
   }

   public async actualizarContrasenia(
      usuario_id: number,
      data: ActualizaContraseniaUsuario
   ): Promise<RespuestaEntity<boolean>> {
      await this._apiUsuario
         .actualizarContrasenia(usuario_id, data)
         .then((resp) => {
            this.respActualizarContrasenia = {
               code: resp.data.code,
               data: resp.data.data,
               error: resp.data.error,
            };
         });
      return this.respActualizarContrasenia;
   }
}
