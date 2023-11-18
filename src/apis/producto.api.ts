import axios, { AxiosResponse } from "axios";
import { ModeloEntity } from "../entities/modelo.entity";
import { ModeloPorFiltroProps } from "../interfaces/modelo.interface";
import { ProductoEntity } from "../entities/producto.entities";
import { personalizarMensajeError } from "../utils/funciones.utils";

export const funcionListarModelosPorFiltro = async (
   categoria_id: number,
   nombre_modelo: string
): Promise<ModeloPorFiltroProps[]> => {
   let modelosFiltro: ModeloPorFiltroProps[] = [];

   await ModeloEntity.ListarModelosPorFiltro(categoria_id, nombre_modelo)
      .then((response) => {
         modelosFiltro = response.data.data;
      })
      .catch((error: Error) => {});

   return modelosFiltro;
};

export enum opcionSerie {
   PEDIDO = "PEDIDO",
   COMPRA = "COMPRA",
}
export class ProductoApi {
   async registrar(data: ProductoEntity): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };

         const body = JSON.stringify(data);

         return await axios.post(
            `${ProductoEntity.url}/registrar`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async actualizar(ID: number, data: ProductoEntity): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               producto_id: ID,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.put(
            `${ProductoEntity.url}/actualizar`,
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

         return await axios.get(`${ProductoEntity.url}/todos`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async buscarPorID(ID: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               producto_id: ID,
            },
         };
         return await axios.get(`${ProductoEntity.url}/uno`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
   async eliminarUno(ID: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               producto_id: ID,
            },
         };
         return await axios.delete(`${ProductoEntity.url}/eliminar`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
   async obtenerSeries(
      detalle_id: number,
      usuario_id: number
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               detalle_id,
               usuario_id,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };
         return await axios.get(`${ProductoEntity.url}/series`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
