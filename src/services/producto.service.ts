import { ProductoApi } from "../apis/producto.api";
import { ProductoEntity } from "../entities/producto.entities";

import { IProductoSerie } from "../interfaces/producto.interface";
import {
   ProductoResponse,
   ProductoSerieResponse,
} from "../responses/producto.response";

export class ProductoService {
   private apiProducto = new ProductoApi();

   private rspProductoRegistar: ProductoResponse = {} as ProductoResponse;
   private rspProductoActualizar: ProductoResponse = {} as ProductoResponse;
   private rspProductoListarTodos: ProductoResponse[] = [];
   private rspProductoEliminarUno: ProductoResponse = {} as ProductoResponse;
   private rspProductoBuscarPorId: ProductoResponse = {} as ProductoResponse;
   private respProductoSeries: ProductoSerieResponse[] = [];

   public async registrar(data: ProductoEntity): Promise<ProductoResponse> {
      await this.apiProducto.registrar(data).then((resp) => {
         this.rspProductoRegistar = resp.data.data;
      });
      return this.rspProductoRegistar;
   }

   public async actualizar(
      producto_id: number,
      data: ProductoEntity
   ): Promise<ProductoResponse> {
      await this.apiProducto.actualizar(producto_id, data).then((resp) => {
         this.rspProductoActualizar = resp.data.data;
      });
      return this.rspProductoActualizar;
   }

   public async listarTodos(): Promise<ProductoResponse[]> {
      await this.apiProducto.listarTodos().then((resp) => {
         this.rspProductoListarTodos = resp.data.data;
      });
      return this.rspProductoListarTodos;
   }

   public async eliminarUno(producto_id: number): Promise<ProductoResponse> {
      await this.apiProducto.eliminarUno(producto_id).then((resp) => {
         this.rspProductoEliminarUno = resp.data.data;
      });
      return this.rspProductoEliminarUno;
   }

   public async buscarPorId(producto_id: number): Promise<ProductoResponse> {
      await this.apiProducto.buscarPorID(producto_id).then((resp) => {
         this.rspProductoBuscarPorId = resp.data.data;
      });
      return this.rspProductoBuscarPorId;
   }

   public async obtenerSeries(
      detalleId: number,
      usuario_id: number
   ): Promise<IProductoSerie[]> {
      await this.apiProducto
         .obtenerSeries(detalleId, usuario_id)
         .then((resp) => {
            this.respProductoSeries = resp.data.data;
         });
      return this.respProductoSeries;
   }
}
