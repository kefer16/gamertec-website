import { CompraApi } from "../apis/compra.api";
import { RespuestaEntity } from "../entities/respuesta.entity";
import {
   CompraRegistra,
   ICompraCard,
   ICompraTable,
} from "../interfaces/compra.interface";

export class CompraService {
   private respuestaRegistrar = new RespuestaEntity<boolean>();
   private respuestaListarTodos = new RespuestaEntity<ICompraCard[]>();
   private respuestaListarUno = new RespuestaEntity<ICompraTable>();

   public async listarTodos(
      usuarioId: number
   ): Promise<RespuestaEntity<ICompraCard[]>> {
      const compraApi = new CompraApi();

      await compraApi.listarTodos(usuarioId).then((resp) => {
         this.respuestaListarTodos = {
            code: resp.data.code,
            data: resp.data.data,
            error: resp.data.error,
         };
      });

      return this.respuestaListarTodos;
   }

   public async listarUno(
      compraCabeceraId: number
   ): Promise<RespuestaEntity<ICompraTable>> {
      const compraApi = new CompraApi();

      await compraApi.listarUno(compraCabeceraId).then((resp) => {
         this.respuestaListarUno = {
            code: resp.data.code,
            data: resp.data.data,
            error: resp.data.error,
         };
      });

      return this.respuestaListarUno;
   }

   public async registrar(
      data: CompraRegistra
   ): Promise<RespuestaEntity<boolean>> {
      const compraApi = new CompraApi();
      await compraApi.registrar(data).then((resp) => {
         this.respuestaRegistrar = {
            code: resp.data.code,
            data: resp.data.data,
            error: resp.data.error,
         };
      });

      return this.respuestaRegistrar;
   }
   public async actualizarCompraEstado(
      compra_cabecera_id: number,
      compra_estado: string
   ): Promise<RespuestaEntity<boolean>> {
      const compraApi = new CompraApi();
      await compraApi
         .actualizarCompraEstado(compra_cabecera_id, compra_estado)
         .then((resp) => {
            this.respuestaRegistrar = {
               code: resp.data.code,
               data: resp.data.data,
               error: resp.data.error,
            };
         });

      return this.respuestaRegistrar;
   }
}
