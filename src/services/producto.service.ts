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
				correcto: true,
				tipo: "success",
				mensaje: "correcto",
				data: resp.data.data,
			};
		});
		return this.respProductoSeries;
	}
}
