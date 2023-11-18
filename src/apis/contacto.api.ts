import axios, { AxiosResponse } from "axios";
import { ContactoEntity } from "../entities/contacto.entity";
import { personalizarMensajeError } from "../utils/funciones.utils";

export class ContactoApi {
   public async listarTodos(): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };
         return await axios.get(`${ContactoEntity.url}/todos`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
   public async listarUno(usuario_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               usuario_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };
         return await axios.get(`${ContactoEntity.url}/todos`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
   public async registrar(data: ContactoEntity): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };

         const body = JSON.stringify(data);
         console.log(data);

         return await axios.post(
            `${ContactoEntity.url}/registrar`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   public async actualizar(
      contacto_id: number,
      data: ContactoEntity
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               contacto_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);
         return await axios.put(`${ContactoEntity.url}/todos`, body, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   public async eliminar(contacto_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               contacto_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };
         return await axios.delete(`${ContactoEntity.url}/todos`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
