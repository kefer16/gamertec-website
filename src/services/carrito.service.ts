import { CarritoApi } from "../apis/carrito.api";
import { CarritoEntity } from "../entities/carrito.entities";
import {
   CarritoCantidadUsuario,
   CarritoUsuarioProps,
} from "../interfaces/carrito.interface";
import { CarritoResponse } from "../responses/carrito.response";

export class CarritoService {
   private apiCarrito = new CarritoApi();

   private rspRegistrar: CarritoResponse = {} as CarritoResponse;
   private rspActualizar: CarritoResponse = {} as CarritoResponse;
   private rspListarTodos: CarritoResponse[] = [];
   private rspHistorial: CarritoResponse[] = [];
   private rspBuscarPorId: CarritoResponse = {} as CarritoResponse;
   private rspEliminarUno: CarritoResponse = {} as CarritoResponse;

   private rspListarCaracteristicas: CarritoUsuarioProps[] = [];
   private rspListarCantidadCarrito: CarritoCantidadUsuario[] = [];
   private rspEliminarModeloCarrito: number[] = [];
   private rspActualizarCantidadCarrito: number[] = [];

   async registrar(data: CarritoEntity): Promise<CarritoResponse> {
      await this.apiCarrito.registrar(data).then((resp) => {
         this.rspRegistrar = resp.data.data;
      });
      return this.rspRegistrar;
   }

   async actualizar(
      carrito_id: number,
      data: CarritoEntity
   ): Promise<CarritoResponse> {
      await this.apiCarrito.actualizar(carrito_id, data).then((resp) => {
         this.rspActualizar = resp.data.data;
      });
      return this.rspActualizar;
   }

   async listarTodos(): Promise<CarritoResponse[]> {
      await this.apiCarrito.listarTodos().then((resp) => {
         this.rspListarTodos = resp.data.data;
      });
      return this.rspListarTodos;
   }

   async historial(carrito_id: number): Promise<CarritoResponse[]> {
      await this.apiCarrito.historial(carrito_id).then((resp) => {
         this.rspHistorial = resp.data.data;
      });
      return this.rspHistorial;
   }

   async buscarPorId(carrito_id: number): Promise<CarritoResponse> {
      await this.apiCarrito.buscarPorId(carrito_id).then((resp) => {
         this.rspBuscarPorId = resp.data.data;
      });
      return this.rspBuscarPorId;
   }

   async eliminarUno(carrito_id: number): Promise<CarritoResponse> {
      await this.apiCarrito.eliminarUno(carrito_id).then((resp) => {
         this.rspEliminarUno = resp.data.data;
      });
      return this.rspEliminarUno;
   }

   async listarCaracteristicas(
      usuario_id: number
   ): Promise<CarritoUsuarioProps[]> {
      await this.apiCarrito.listarCaracteristicas(usuario_id).then((resp) => {
         this.rspListarCaracteristicas = resp.data.data;
      });

      return this.rspListarCaracteristicas;
   }

   async listarCantidadCarrito(
      usuario_id: number
   ): Promise<CarritoCantidadUsuario[]> {
      await this.apiCarrito.listarCantidadCarrito(usuario_id).then((resp) => {
         this.rspListarCantidadCarrito = resp.data.data;
      });
      return this.rspListarCantidadCarrito;
   }

   async eliminarModeloCarrito(
      carrito_id: number,
      usuario_id: number
   ): Promise<number[]> {
      await this.apiCarrito
         .eliminarModeloCarrito(carrito_id, usuario_id)
         .then((resp) => {
            this.rspEliminarModeloCarrito = resp.data.data;
         });
      return this.rspEliminarModeloCarrito;
   }

   async actualizarCantidadCarrito(
      carrito_id: number,
      cantidad: number,
      usuario_id: number
   ): Promise<number[]> {
      await this.apiCarrito
         .actualizarCantidadCarrito(carrito_id, cantidad, usuario_id)
         .then((resp) => {
            this.rspActualizarCantidadCarrito = resp.data.data;
         });
      return this.rspActualizarCantidadCarrito;
   }
}
