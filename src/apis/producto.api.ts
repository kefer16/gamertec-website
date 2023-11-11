import axios, { AxiosResponse } from "axios";
import { ModeloEntity } from "../entities/modelo.entity";
import { ModeloPorFiltroProps } from "../interfaces/modelo.interface";
import { ProductoService } from "../entities/producto.entities";
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
   static async obtenerSeries(
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
         return await axios.get(`${ProductoService.url}/series`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
