import axios, { AxiosResponse } from "axios";
import { DistritoEntity } from "../entities/distrito.entity";
import { personalizarMensajeError } from "../utils/funciones.utils";

export class DistritoApi {
   async registrar(data: DistritoEntity): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };

         const body = JSON.stringify(data);

         return await axios.post(
            `${DistritoEntity.url}/registrar`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async actualizar(ID: number, data: DistritoEntity): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               distrito_id: ID,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.put(
            `${DistritoEntity.url}/actualizar`,
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

         return await axios.get(`${DistritoEntity.url}/todos`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async historial(ID: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               distrito_id: ID,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };

         return await axios.get(`${DistritoEntity.url}/historial`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async buscarPorID(ID: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               distrito_id: ID,
            },
         };
         return await axios.get(`${DistritoEntity.url}/uno`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async eliminarUno(ID: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               distrito_id: ID,
            },
         };
         return await axios.delete(`${DistritoEntity.url}/eliminar`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
