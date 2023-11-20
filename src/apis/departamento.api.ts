import axios, { AxiosResponse } from "axios";
import { DepartamentoEntity } from "../entities/departamento.entity";
import { personalizarMensajeError } from "../utils/funciones.utils";

export class DepartamentoApi {
   async registrar(data: DepartamentoEntity): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };

         const body = JSON.stringify(data);

         return await axios.post(
            `${DepartamentoEntity.url}/registrar`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async actualizar(
      departamento_id: number,
      data: DepartamentoEntity
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               departamento_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.put(
            `${DepartamentoEntity.url}/actualizar`,
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

         return await axios.get(`${DepartamentoEntity.url}/todos`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async historial(departamento_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               departamento_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };

         return await axios.get(`${DepartamentoEntity.url}/historial`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async buscarPorId(departamento_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               departamento_id,
            },
         };
         return await axios.get(`${DepartamentoEntity.url}/uno`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async eliminarUno(departamento_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               departamento_id,
            },
         };
         return await axios.delete(
            `${DepartamentoEntity.url}/eliminar`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
