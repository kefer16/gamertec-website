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
      } catch (error: any) {
         error.message = error.response.data.error.message;
         return Promise.reject(error);
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

         return await axios.post(
            `${UsuarioEntity.url}/registrar`,
            body,
            config
         );
      } catch (err: any) {
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

         return await axios.put(
            `${UsuarioEntity.url}/actualizar`,
            body,
            config
         );
      } catch (err: any) {
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
         return Promise.reject(err);
      }
   }

   static async actualizarNombre(
      ID: number,
      data: ActualizaNombreUsuario
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

         return await axios.put(
            `${UsuarioEntity.url}/actualizar_nombre`,
            body,
            config
         );
      } catch (err: any) {
         return Promise.reject(err);
      }
   }

   static async actualizarApellido(
      ID: number,
      data: ActualizaApellidoUsuario
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

         return await axios.put(
            `${UsuarioEntity.url}/actualizar_apellido`,
            body,
            config
         );
      } catch (err: any) {
         return Promise.reject(err);
      }
   }

   static async actualizarCorreo(
      ID: number,
      data: ActualizaCorreoUsuario
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

         return await axios.put(
            `${UsuarioEntity.url}/actualizar_correo`,
            body,
            config
         );
      } catch (err: any) {
         return Promise.reject(err);
      }
   }

   static async actualizarDireccion(
      ID: number,
      data: ActualizaDireccionUsuario
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

         return await axios.put(
            `${UsuarioEntity.url}/actualizar_direccion`,
            body,
            config
         );
      } catch (err: any) {
         return Promise.reject(err);
      }
   }
   async actualizarFoto(
      ID: number,
      data: ActualizaFotoUsuario
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

         return await axios.put(
            `${UsuarioEntity.url}/actualizar_foto`,
            body,
            config
         );
      } catch (error: any) {
         return Promise.reject(error.response.data);
      }
   }

   async actualizarContrasenia(
      ID: number,
      data: ActualizaContraseniaUsuario
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
