import axios, { AxiosResponse } from "axios";

import { personalizarMensajeError } from "../utils/funciones.utils";
import { CategoriaEntity } from "../entities/categoria.entities";

export class CategoriaApi {
   async registrar(data_usuario: CategoriaEntity): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };

         const body = JSON.stringify(data_usuario);

         return await axios.post(
            `${CategoriaEntity.url}/registrar`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async actualizar(
      categoria_id: number,
      data_categoria: CategoriaEntity
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               categoria_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data_categoria);

         return await axios.put(
            `${CategoriaEntity.url}/actualizar`,
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

         return await axios.get(`${CategoriaEntity.url}/todos`, config);
      } catch (err: any) {
         return Promise.reject(err);
      }
   }

   async historial(categoria_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               categoria_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };

         return await axios.get(`${CategoriaEntity.url}/historial`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async eliminarUno(ID: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               categoria_id: ID,
            },
         };
         return await axios.delete(`${CategoriaEntity.url}/eliminar`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
