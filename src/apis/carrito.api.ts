import axios, { AxiosResponse } from "axios";
import { CarritoEntity } from "../entities/carrito.entities";
import { personalizarMensajeError } from "../utils/funciones.utils";

export class CarritoApi {
   static async Registrar(data: CarritoEntity): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };

         const body = JSON.stringify(data);

         return await axios.post(
            `${CarritoEntity.url}/registrar`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   static async Actualizar(
      ID: number,
      data: CarritoEntity
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               carrito_id: ID,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.put(
            `${CarritoEntity.url}/actualizar`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   static async ListarTodos(): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };

         return await axios.get(`${CarritoEntity.url}/todos`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   static async Historial(ID: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               carrito_id: ID,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };

         return await axios.get(`${CarritoEntity.url}/historial`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   static async BuscarPorID(ID: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               carrito_id: ID,
            },
         };
         return await axios.get(`${CarritoEntity.url}/uno`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   static async EliminarUno(ID: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               carrito_id: ID,
            },
         };
         return await axios.delete(`${CarritoEntity.url}/eliminar`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   static async ObtenerCarritoPorUsuario(
      usuario_id: number
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               usuario_id,
            },
         };
         return await axios.get(
            `${CarritoEntity.url}/obtener_carrito_por_usuario`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async obtenerCantidadCarrito(usuario_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               usuario_id,
            },
         };
         return await axios.get(
            `${CarritoEntity.url}/obtener_cantidad_carrito`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async eliminarModeloCarrito(
      carrito_id: number,
      usuario_id: number
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               carrito_id,
               usuario_id,
            },
         };
         return await axios.delete(
            `${CarritoEntity.url}/eliminar_modelo_carrito`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async actualizarCantidadCarrito(
      carrito_id: number,
      cantidad: number,
      usuario_id: number
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               carrito_id,
               cantidad,
               usuario_id,
            },
         };

         return await axios.put(
            `${CarritoEntity.url}/actualizar_cantidad_carrito`,
            {},
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
