import { PedidoApi } from "../apis/pedido.api";

import { PedidoCabeceraEntity } from "../entities/pedido_cabecera.entities";
import { RespuestaEntity } from "../entities/respuesta.entity";

export class PedidoService {
	private respuestaPedidoCabecera = new RespuestaEntity<PedidoCabeceraEntity>();
	private respuestaArrayPedidoCabecera = new RespuestaEntity<
		PedidoCabeceraEntity[]
	>();

	public async registrar(
		data: PedidoCabeceraEntity
	): Promise<RespuestaEntity<PedidoCabeceraEntity>> {
		await PedidoApi.Registrar(data)
			.then((resp) => {
				this.respuestaPedidoCabecera = {
					correcto: true,
					tipo: "success",
					mensaje: "correcto",
					data: resp.data.data[0],
				};
				return this.respuestaPedidoCabecera;
			})
			.catch((error: any) => {
				return this.respuestaPedidoCabecera;
			});
		return this.respuestaPedidoCabecera;
	}

	public async ultimo(): Promise<RespuestaEntity<PedidoCabeceraEntity>> {
		await PedidoApi.listarUltimo()
			.then((resp) => {
				console.log("ultimo", resp);

				this.respuestaPedidoCabecera = {
					correcto: true,
					tipo: "success",
					mensaje: "correcto",
					data: resp.data.data[0],
				};
				return this.respuestaPedidoCabecera;
			})
			.catch((error: any) => {
				return this.respuestaPedidoCabecera;
			});
		return this.respuestaPedidoCabecera;
	}

	public async listarPedidoUsuario(
		usuario_id: number
	): Promise<RespuestaEntity<PedidoCabeceraEntity[]>> {
		await PedidoApi.listarPedidoUsuario(usuario_id)
			.then((resp) => {
				this.respuestaArrayPedidoCabecera = {
					correcto: true,
					tipo: "success",
					mensaje: "correcto",
					data: resp.data.data,
				};
				return this.respuestaArrayPedidoCabecera;
			})
			.catch((error: any) => {
				return this.respuestaArrayPedidoCabecera;
			});
		return this.respuestaArrayPedidoCabecera;
	}
}
