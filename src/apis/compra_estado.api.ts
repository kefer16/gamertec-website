import axios, { AxiosResponse } from "axios";
import { CompraEstadoEntity } from "../entities/compra_estado.entities";
import { personalizarMensajeError } from "../utils/funciones.utils";

export class CompraEstadoApi {
   async listarTodos(): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };
         return await axios.get(
            `${CompraEstadoEntity.url}/listar_todos`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async listarUno(compra_estado_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               compra_estado_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };

         return await axios.get(`${CompraEstadoEntity.url}/listar_uno`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
