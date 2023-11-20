import { UsuarioApi } from "../apis/usuario.api";
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
   private apiUsuario = new UsuarioApi();

   private rspLogearse: LogeoUsuario = {} as LogeoUsuario;
   private rspRegistrar: boolean = false;
   private rspActualizar: boolean = false;
   private rspListarTodo: UsuarioEntity[] = [];
   private rspHistorial: UsuarioEntity[] = [];
   private rspEliminarUno: boolean = false;

   private rspActualizarNombre: ActualizaNombreUsuario =
      {} as ActualizaNombreUsuario;
   private rspActualizarApellido: ActualizaApellidoUsuario =
      {} as ActualizaApellidoUsuario;
   private rspActualizarCorreo: ActualizaCorreoUsuario =
      {} as ActualizaCorreoUsuario;
   private rspActualizarDireccion: ActualizaDireccionUsuario =
      {} as ActualizaDireccionUsuario;
   private rspActualizarFoto: ActualizaFotoUsuario = {} as ActualizaFotoUsuario;
   private rspActualizarContrasenia: boolean = false;

   public async logearse(
      usuario: string,
      contrasenia: string
   ): Promise<LogeoUsuario> {
      await this.apiUsuario.logearse(usuario, contrasenia).then((resp) => {
         this.rspLogearse = resp.data.data;
      });
      return this.rspLogearse;
   }

   public async registrar(data: UsuarioEntity): Promise<boolean> {
      await this.apiUsuario.registrar(data).then((resp) => {
         this.rspRegistrar = resp.data.data;
      });
      return this.rspRegistrar;
   }

   public async actualizar(
      usuario_id: number,
      data: UsuarioEntity
   ): Promise<boolean> {
      await this.apiUsuario.actualizar(usuario_id, data).then((resp) => {
         this.rspActualizar = resp.data.data;
      });
      return this.rspActualizar;
   }

   public async listarTodos(): Promise<UsuarioEntity[]> {
      await this.apiUsuario.listarTodos().then((resp) => {
         this.rspListarTodo = resp.data.data;
      });
      return this.rspListarTodo;
   }

   public async historial(idUsuario: number): Promise<UsuarioEntity[]> {
      await this.apiUsuario.historial(idUsuario).then((resp) => {
         this.rspHistorial = resp.data.data;
      });
      return this.rspHistorial;
   }

   public async eliminarUno(usuario_id: number): Promise<boolean> {
      await this.apiUsuario.eliminarUno(usuario_id).then((resp) => {
         this.rspEliminarUno = resp.data.data;
      });
      return this.rspEliminarUno;
   }

   public async actualizarNombre(
      usuario_id: number,
      data: ActualizaNombreUsuario
   ): Promise<ActualizaNombreUsuario> {
      await this.apiUsuario.actualizarNombre(usuario_id, data).then((resp) => {
         this.rspActualizarNombre = resp.data.data;
      });
      return this.rspActualizarNombre;
   }

   public async actualizarApellido(
      usuario_id: number,
      data: ActualizaApellidoUsuario
   ): Promise<ActualizaApellidoUsuario> {
      await this.apiUsuario
         .actualizarApellido(usuario_id, data)
         .then((resp) => {
            this.rspActualizarApellido = resp.data.data;
         });
      return this.rspActualizarApellido;
   }

   public async actualizarCorreo(
      usuario_id: number,
      data: ActualizaCorreoUsuario
   ): Promise<ActualizaCorreoUsuario> {
      await this.apiUsuario.actualizarCorreo(usuario_id, data).then((resp) => {
         this.rspActualizarCorreo = resp.data.data;
      });
      return this.rspActualizarCorreo;
   }

   public async actualizarDireccion(
      usuario_id: number,
      data: ActualizaDireccionUsuario
   ): Promise<ActualizaDireccionUsuario> {
      await this.apiUsuario
         .actualizarDireccion(usuario_id, data)
         .then((resp) => {
            this.rspActualizarDireccion = resp.data.data;
         });
      return this.rspActualizarDireccion;
   }

   public async actualizarFoto(
      usuario_id: number,
      data: ActualizaFotoUsuario
   ): Promise<ActualizaFotoUsuario> {
      await this.apiUsuario.actualizarFoto(usuario_id, data).then((resp) => {
         this.rspActualizarFoto = resp.data.data;
      });
      return this.rspActualizarFoto;
   }

   public async actualizarContrasenia(
      usuario_id: number,
      data: ActualizaContraseniaUsuario
   ): Promise<boolean> {
      await this.apiUsuario
         .actualizarContrasenia(usuario_id, data)
         .then((resp) => {
            this.rspActualizarContrasenia = resp.data.data;
         });
      return this.rspActualizarContrasenia;
   }
}
