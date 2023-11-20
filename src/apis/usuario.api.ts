import axios, { AxiosResponse } from "axios";
import { UsuarioEntity } from "../entities/usuario.entities";
import {
   ActualizaApellidoUsuario,
   ActualizaContraseniaUsuario,
   ActualizaCorreoUsuario,
   ActualizaDireccionUsuario,
   ActualizaFotoUsuario,
   ActualizaNombreUsuario,
} from "../interfaces/usuario.interface";
import { personalizarMensajeError } from "../utils/funciones.utils";

export class UsuarioApi {
   async logearse(
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
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async registrar(data: UsuarioEntity): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.post(
            `${UsuarioEntity.url}/registrar`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async actualizar(ID: number, data: UsuarioEntity): Promise<AxiosResponse> {
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

         return await axios.put(
            `${UsuarioEntity.url}/actualizar`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
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

   async listarTodos(): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };

         return await axios.get(`${UsuarioEntity.url}/todos`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async historial(idUsuario: number): Promise<AxiosResponse> {
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
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async eliminarUno(ID: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               usuario_id: ID,
            },
         };
         return await axios.delete(`${UsuarioEntity.url}/eliminar`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async actualizarNombre(
      usuario_id: number,
      data: ActualizaNombreUsuario
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               usuario_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.put(
            `${UsuarioEntity.url}/actualizar_nombre`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async actualizarApellido(
      usuario_id: number,
      data: ActualizaApellidoUsuario
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               usuario_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.put(
            `${UsuarioEntity.url}/actualizar_apellido`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async actualizarCorreo(
      usuario_id: number,
      data: ActualizaCorreoUsuario
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               usuario_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.put(
            `${UsuarioEntity.url}/actualizar_correo`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async actualizarDireccion(
      usuario_id: number,
      data: ActualizaDireccionUsuario
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               usuario_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.put(
            `${UsuarioEntity.url}/actualizar_direccion`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
   async actualizarFoto(
      usuario_id: number,
      data: ActualizaFotoUsuario
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               usuario_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.put(
            `${UsuarioEntity.url}/actualizar_foto`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error.response.data);
      }
   }

   async actualizarContrasenia(
      usuario_id: number,
      data: ActualizaContraseniaUsuario
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               usuario_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.put(
            `${UsuarioEntity.url}/actualizar_contrasenia`,
            body,
            config
         );
      } catch (error: any) {
         error.message = error.response.data.error.message;
         return Promise.reject(error);
      }
   }
}
