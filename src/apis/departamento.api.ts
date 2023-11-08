import axios, { AxiosResponse } from "axios";
import { DepartamentoEntity } from "../entities/departamento.entity";

export class DepartamentoApi {
   static async Registrar(data: DepartamentoEntity): Promise<AxiosResponse> {
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
      } catch (err: any) {
         return Promise.reject(err);
      }
   }

   static async Actualizar(
      ID: number,
      data: DepartamentoEntity
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               departamento_id: ID,
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
      } catch (err: any) {
         return Promise.reject(err);
      }
   }

   static async ListarTodos(): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };

         return await axios.get(`${DepartamentoEntity.url}/todos`, config);
      } catch (err: any) {
         return Promise.reject(err);
      }
   }

   static async Historial(ID: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               departamento_id: ID,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };

         return await axios.get(`${DepartamentoEntity.url}/historial`, config);
      } catch (err: any) {
         return Promise.reject(err);
      }
   }

   static async BuscarPorID(ID: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               departamento_id: ID,
            },
         };
         return await axios.get(`${DepartamentoEntity.url}/uno`, config);
      } catch (err: any) {
         return Promise.reject(err);
      }
   }

   static async EliminarUno(ID: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               departamento_id: ID,
            },
         };
         return await axios.delete(
            `${DepartamentoEntity.url}/eliminar`,
            config
         );
      } catch (err: any) {
         return Promise.reject(err);
      }
   }
}
