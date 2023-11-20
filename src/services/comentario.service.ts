import { ComentarioApi } from "../apis/comentario.api";
// import { DropdownProps } from "../components/admin/categoria/CategoriaRegistro";
import { ComentarioEntity } from "../entities/comentario.entity";
import { ComentarioResponse } from "../responses/comentario.response";

export class ComentarioService {
   private apiComentario = new ComentarioApi();

   private rspRegistar: ComentarioResponse = {} as ComentarioResponse;
   private rspActualizar: ComentarioResponse = {} as ComentarioResponse;
   private rspListarTodos: ComentarioResponse[] = [];
   private rspHistorial: ComentarioResponse[] = [];
   private rspBuscarPorId: ComentarioResponse = {} as ComentarioResponse;
   private rspEliminarUno: ComentarioResponse = {} as ComentarioResponse;
   private rspBuscarPorModelo: ComentarioResponse[] = [];

   public async registrar(data: ComentarioEntity): Promise<ComentarioResponse> {
      await this.apiComentario.registrar(data).then((resp) => {
         this.rspRegistar = resp.data.data;
      });
      return this.rspRegistar;
   }

   public async actualizar(
      marca_id: number,
      data: ComentarioEntity
   ): Promise<ComentarioResponse> {
      await this.apiComentario.actualizar(marca_id, data).then((resp) => {
         this.rspActualizar = resp.data.data;
      });
      return this.rspActualizar;
   }

   public async listarTodos(): Promise<ComentarioResponse[]> {
      await this.apiComentario.listarTodos().then((resp) => {
         this.rspListarTodos = resp.data.data;
      });
      return this.rspListarTodos;
   }

   public async historial(
      comentario_id: number
   ): Promise<ComentarioResponse[]> {
      await this.apiComentario.historial(comentario_id).then((resp) => {
         this.rspHistorial = resp.data.data;
      });
      return this.rspHistorial;
   }

   public async buscarPorId(
      comentario_id: number
   ): Promise<ComentarioResponse> {
      await this.apiComentario.buscarPorId(comentario_id).then((resp) => {
         this.rspBuscarPorId = resp.data.data;
      });
      return this.rspBuscarPorId;
   }

   public async eliminarUno(
      comentario_id: number
   ): Promise<ComentarioResponse> {
      await this.apiComentario.eliminarUno(comentario_id).then((resp) => {
         this.rspEliminarUno = resp.data.data;
      });
      return this.rspEliminarUno;
   }

   public async buscarPorModelo(
      modelo_id: number
   ): Promise<ComentarioResponse[]> {
      await this.apiComentario.buscarPorModelo(modelo_id).then((resp) => {
         this.rspBuscarPorModelo = resp.data.data;
      });
      return this.rspBuscarPorModelo;
   }
}
