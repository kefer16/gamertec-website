import { CompraEstadoApi } from "../apis/compra_estado.api";
import {
   CompraEstadoListaTodos,
   CompraEstadoListaUno,
} from "../interfaces/compra_estado.interface";

export class CompraEstadoService {
   private apiCompraEstado = new CompraEstadoApi();

   private rspListarTodos: CompraEstadoListaTodos[] = [];
   private rspListarUno: CompraEstadoListaUno = {} as CompraEstadoListaUno;

   public async listarTodos(): Promise<CompraEstadoListaTodos[]> {
      await this.apiCompraEstado.listarTodos().then((resp) => {
         this.rspListarTodos = resp.data.data;
      });
      return this.rspListarTodos;
   }

   public async listarUno(
      compra_estado_id: number
   ): Promise<CompraEstadoListaUno> {
      await this.apiCompraEstado.listarUno(compra_estado_id).then((resp) => {
         this.rspListarUno = resp.data.data;
      });
      return this.rspListarUno;
   }
}
