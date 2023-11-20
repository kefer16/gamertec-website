import axios, { AxiosResponse } from "axios";
import { PedidoCabeceraEntity } from "../entities/pedido_cabecera.entities";
import {
   IActualizaSerie,
   IPedidoCabeceraInterface,
} from "../interfaces/pedido.interface";
import { personalizarMensajeError } from "../utils/funciones.utils";

export class PedidoApi {
   async crearPreferencia(usuario_id: number): Promise<AxiosResponse> {
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

   async registrar(data: IPedidoCabeceraInterface): Promise<AxiosResponse> {
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

   async actualizar(
      pedido_id: number,
      data: PedidoCabeceraEntity
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               pedido_id,
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

   async listarTodos(): Promise<AxiosResponse> {
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

   async listarUno(pedido_id: number): Promise<AxiosResponse> {
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

   async historial(pedido_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               pedido_id,
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

   async buscarPorId(pedido_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               pedido_id,
            },
         };
         return await axios.get(`${PedidoCabeceraEntity.url}/uno`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async eliminarUno(pedido_id: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               pedido_id,
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

   async listarUltimo(): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };
         return await axios.get(`${PedidoCabeceraEntity.url}/ultimo`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async listarPedidoUsuario(usuario_id: number): Promise<AxiosResponse> {
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

   async agregarSeries(
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
