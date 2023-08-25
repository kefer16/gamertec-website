import { ProductoApi, opcionSerie } from "../apis/producto.api";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { IProductoSerie } from "../interfaces/producto.interface";

export class ProductoService {
	private respProductoSeries = new RespuestaEntity<IProductoSerie[]>();

	public async obtenerSeries(
		detalleId: number,
		opcion: opcionSerie
	): Promise<RespuestaEntity<IProductoSerie[]>> {
		await ProductoApi.obtenerSeries(detalleId, opcion).then((resp) => {
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
