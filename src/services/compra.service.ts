import { CompraApi } from "../apis/compra.api";
import {
   CompraRegistra,
   ICompraCard,
   ICompraTable,
} from "../interfaces/compra.interface";

export class CompraService {
   private apiCompra = new CompraApi();

   private rspRegistrar: boolean = false;
   private rspListarTodos: ICompraCard[] = [];
   private rspListarUno: ICompraTable = {} as ICompraTable;

   async listarTodos(usuarioId: number): Promise<ICompraCard[]> {
      await this.apiCompra.listarTodos(usuarioId).then((resp) => {
         this.rspListarTodos = resp.data.data;
      });
      return this.rspListarTodos;
   }

   async listarUno(compraCabeceraId: number): Promise<ICompraTable> {
      await this.apiCompra.listarUno(compraCabeceraId).then((resp) => {
         this.rspListarUno = resp.data.data;
      });
      return this.rspListarUno;
   }

   async registrar(data: CompraRegistra): Promise<boolean> {
      const compraApi = new CompraApi();
      await compraApi.registrar(data).then((resp) => {
         this.rspRegistrar = resp.data.data;
      });
      return this.rspRegistrar;
   }
   async actualizarCompraEstado(
      compra_cabecera_id: number,
      compra_estado: string
   ): Promise<boolean> {
      const compraApi = new CompraApi();
      await compraApi
         .actualizarCompraEstado(compra_cabecera_id, compra_estado)
         .then((resp) => {
            this.rspRegistrar = resp.data.data;
         });
      return this.rspRegistrar;
   }
}
