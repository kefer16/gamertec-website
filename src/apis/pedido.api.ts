import axios, { AxiosResponse } from "axios";
import { PedidoCabeceraEntity } from "../entities/pedido_cabecera.entities";
import {
   IActualizaSerie,
   IPedidoCabeceraInterface,
} from "../interfaces/pedido.interface";

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
      } catch (err: any) {
         return Promise.reject(err);
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
      } catch (err: any) {
         return Promise.reject(err);
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

         return await axios.get(`${PedidoCabeceraEntity.url}/todos`, config);
      } catch (err: any) {
         return Promise.reject(err);
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
      } catch (err: any) {
         return Promise.reject(err);
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
      } catch (err: any) {
         return Promise.reject(err);
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
      } catch (err: any) {
         return Promise.reject(err);
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
      } catch (err: any) {
         return Promise.reject(err);
      }
   }

   static async listarUltimo(): Promise<AxiosResponse> {
      try {
         return await axios.get(`${PedidoCabeceraEntity.url}/ultimo`);
      } catch (err: any) {
         return Promise.reject(err);
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
      } catch (err: any) {
         return Promise.reject(err);
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
      } catch (err: any) {
         return Promise.reject(err);
      }
   }
}
