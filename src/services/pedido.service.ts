import { PedidoApi } from "../apis/pedido.api";
import { PedidoCabeceraEntity } from "../entities/pedido_cabecera.entities";
import {
   IActualizaSerie,
   IPedidoCabeceraInterface,
   IPedidoCabeceraListarUno,
   PedidoCabeceraUsuarioProsp,
   RespuestaPedidoPreferencia,
} from "../interfaces/pedido.interface";
export class PedidoService {
   private apiPedido = new PedidoApi();

   private rspCrearPreferencia: RespuestaPedidoPreferencia =
      {} as RespuestaPedidoPreferencia;
   private rspRegistrar: PedidoCabeceraEntity = {} as PedidoCabeceraEntity;
   private rspUltimo: PedidoCabeceraEntity = {} as PedidoCabeceraEntity;
   private rspListarPedidoUsuario: PedidoCabeceraUsuarioProsp[] = [];
   private rspListarUno: IPedidoCabeceraListarUno =
      {} as IPedidoCabeceraListarUno;
   private rspAgregarSeries: boolean = false;

   async crearPreferencia(
      usuario_id: number
   ): Promise<RespuestaPedidoPreferencia> {
      await this.apiPedido.crearPreferencia(usuario_id).then((resp) => {
         this.rspCrearPreferencia = resp.data.data;
      });
      return this.rspCrearPreferencia;
   }

   public async registrar(
      data: IPedidoCabeceraInterface
   ): Promise<PedidoCabeceraEntity> {
      await this.apiPedido.registrar(data).then((resp) => {
         this.rspRegistrar = resp.data.data;
      });
      return this.rspRegistrar;
   }

   async ultimo(): Promise<PedidoCabeceraEntity> {
      await this.apiPedido.listarUltimo().then((resp) => {
         this.rspUltimo = resp.data.data;
      });
      return this.rspUltimo;
   }

   async listarPedidoUsuario(
      usuario_id: number
   ): Promise<PedidoCabeceraUsuarioProsp[]> {
      await this.apiPedido.listarPedidoUsuario(usuario_id).then((resp) => {
         this.rspListarPedidoUsuario = resp.data.data;
      });
      return this.rspListarPedidoUsuario;
   }

   async listarUno(pedido_id: number): Promise<IPedidoCabeceraListarUno> {
      await this.apiPedido.listarUno(pedido_id).then((resp) => {
         this.rspListarUno = resp.data.data;
      });
      return this.rspListarUno;
   }

   async agregarSeries(
      compra_detalle_id: number,
      data: IActualizaSerie[]
   ): Promise<boolean> {
      await this.apiPedido
         .agregarSeries(compra_detalle_id, data)
         .then((resp) => {
            this.rspAgregarSeries = resp.data.data;
         });

      return this.rspAgregarSeries;
   }
}
