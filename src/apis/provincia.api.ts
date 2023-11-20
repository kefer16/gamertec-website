import axios, { AxiosResponse } from "axios";

import { ProvinciaEntity } from "../entities/provincia.entity";
import { personalizarMensajeError } from "../utils/funciones.utils";

export class ProvinciaApi {
   async registrar(data: ProvinciaEntity): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };

         const body = JSON.stringify(data);

         return await axios.post(
            `${ProvinciaEntity.url}/registrar`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async actualizar(ID: number, data: ProvinciaEntity): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               provincia_id: ID,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.put(
            `${ProvinciaEntity.url}/actualizar`,
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

         return await axios.get(`${ProvinciaEntity.url}/todos`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async historial(provincia_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               provincia_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };

         return await axios.get(`${ProvinciaEntity.url}/historial`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async buscarPorId(provincia_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               provincia_id,
            },
         };
         return await axios.get(`${ProvinciaEntity.url}/uno`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async eliminarUno(provincia_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               provincia_id,
            },
         };
         return await axios.delete(`${ProvinciaEntity.url}/eliminar`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
