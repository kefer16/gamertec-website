import axios, { AxiosResponse } from "axios";
import { ComentarioEntity } from "../entities/comentario.entity";
import { personalizarMensajeError } from "../utils/funciones.utils";

export class ComentarioApi {
   async registrar(data: ComentarioEntity): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };

         const body = JSON.stringify(data);

         return await axios.post(
            `${ComentarioEntity.url}/registrar`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async actualizar(
      comentario_id: number,
      data: ComentarioEntity
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               comentario_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.put(
            `${ComentarioEntity.url}/actualizar`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async listarTodos(): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };

         return await axios.get(`${ComentarioEntity.url}/todos`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async historial(comentario_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               comentario_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };

         return await axios.get(`${ComentarioEntity.url}/historial`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async buscarPorId(comentario_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               comentario_id,
            },
         };
         return await axios.get(`${ComentarioEntity.url}/uno`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async eliminarUno(comentario_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               comentario_id,
            },
         };
         return await axios.delete(`${ComentarioEntity.url}/eliminar`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async buscarPorModelo(modelo_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               modelo_id,
            },
         };
         return await axios.get(
            `${ComentarioEntity.url}/buscar_por_modelo`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
