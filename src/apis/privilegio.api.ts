import axios, { AxiosResponse } from "axios";
import { PrivilegioEntity } from "../entities/privilegio.entities";
import { personalizarMensajeError } from "../utils/funciones.utils";

export class PrivilegioApi {
   async registrar(data: PrivilegioEntity): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };

         const body = JSON.stringify(data);

         return await axios.post(
            `${PrivilegioEntity.url}/registrar`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async actualizar(
      privilegio_id: number,
      data: PrivilegioEntity
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               privilegio_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.put(
            `${PrivilegioEntity.url}/actualizar`,
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

         return await axios.get(`${PrivilegioEntity.url}/todos`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
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

         return await axios.get(`${PrivilegioEntity.url}/historial`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async buscarPorId(privilegio_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               privilegio_id,
            },
         };
         return await axios.get(`${PrivilegioEntity.url}/uno`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async eliminarUno(privilegio_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               privilegio_id,
            },
         };
         return await axios.delete(`${PrivilegioEntity.url}/eliminar`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
