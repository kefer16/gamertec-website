import axios, { AxiosResponse } from "axios";
import { MarcaEntity } from "../entities/marca.entities";
import { personalizarMensajeError } from "../utils/funciones.utils";

export class MarcaApi {
   async registrar(data: MarcaEntity): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };

         const body = JSON.stringify(data);

         return await axios.post(`${MarcaEntity.url}/registrar`, body, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async actualizar(
      marca_id: number,
      data: MarcaEntity
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               marca_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.put(`${MarcaEntity.url}/actualizar`, body, config);
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

         return await axios.get(`${MarcaEntity.url}/todos`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async historial(marca_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               marca_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };

         return await axios.get(`${MarcaEntity.url}/historial`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async buscarPorId(marca_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               marca_id,
            },
         };
         return await axios.get(`${MarcaEntity.url}/uno`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async eliminarUno(marca_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               marca_id,
            },
         };
         return await axios.delete(`${MarcaEntity.url}/eliminar`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
