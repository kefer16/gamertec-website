import { ProductoApi } from "../apis/producto.api";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { IProductoSerie } from "../interfaces/producto.interface";

export class ProductoService {
   private respProductoSeries = new RespuestaEntity<IProductoSerie[]>();

   public async obtenerSeries(
      detalleId: number,
      usuario_id: number
   ): Promise<RespuestaEntity<IProductoSerie[]>> {
      await ProductoApi.obtenerSeries(detalleId, usuario_id).then((resp) => {
         this.respProductoSeries = {
            code: resp.data.code,
            data: resp.data.data,
            error: resp.data.error,
         };
      });
      return this.respProductoSeries;
   }
}
