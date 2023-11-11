import axios, { AxiosResponse } from "axios";
import { PedidoCabeceraEntity } from "../entities/pedido_cabecera.entities";
import {
   IActualizaSerie,
   IPedidoCabeceraInterface,
} from "../interfaces/pedido.interface";
import { personalizarMensajeError } from "../utils/funciones.utils";

export class PedidoApi {
   static async crearPreferencia(usuario_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               usuario_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };
         return await axios.post(
            `${PedidoCabeceraEntity.url}/crear_preferencia`,
            {},
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   static async Registrar(
      data: IPedidoCabeceraInterface
   ): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.post(
            `${PedidoCabeceraEntity.url}/registrar`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   static async Actualizar(
      ID: number,
      data: PedidoCabeceraEntity
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               pedido_id: ID,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.put(
            `${PedidoCabeceraEntity.url}/actualizar`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   static async ListarTodos(): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };

         return await axios.get(`${PedidoCabeceraEntity.url}/todos`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   static async listarUno(pedido_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               pedido_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };

         return await axios.get(`${PedidoCabeceraEntity.url}/uno`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   static async Historial(ID: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               pedido_id: ID,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };

         return await axios.get(
            `${PedidoCabeceraEntity.url}/historial`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   static async BuscarPorID(ID: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               pedido_id: ID,
            },
         };
         return await axios.get(`${PedidoCabeceraEntity.url}/uno`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   static async EliminarUno(ID: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               pedido_id: ID,
            },
         };
         return await axios.delete(
            `${PedidoCabeceraEntity.url}/eliminar`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   static async listarUltimo(): Promise<AxiosResponse> {
      try {
         return await axios.get(`${PedidoCabeceraEntity.url}/ultimo`);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   static async listarPedidoUsuario(
      usuario_id: number
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               usuario_id,
            },
         };
         return await axios.get(
            `${PedidoCabeceraEntity.url}/pedidos_usuario`,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   static async agregarSeries(
      compra_detalle_id: number,
      data: IActualizaSerie[]
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               compra_detalle_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };

         const body = JSON.stringify(data);

         return await axios.put(
            `${PedidoCabeceraEntity.url}/agregar_series`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
