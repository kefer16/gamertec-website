import { PedidoApi } from "../apis/pedido.api";

import { PedidoCabeceraEntity } from "../entities/pedido_cabecera.entities";
import { RespuestaEntity } from "../entities/respuesta.entity";
import {
	IActualizaSerie,
	IPedidoCabeceraInterface,
	IPedidoCabeceraListarUno,
	PedidoCabeceraUsuarioProsp,
	RespuestaPedidoPreferencia,
} from "../interfaces/pedido.interface";

export class PedidoService {
	private respuestaPedidoCabecera = new RespuestaEntity<PedidoCabeceraEntity>();
	private respuestaArrayPedidoCabecera = new RespuestaEntity<PedidoCabeceraUsuarioProsp[]>();
	private respuestaPedidoListarUno =	new RespuestaEntity<IPedidoCabeceraListarUno>();

	private respuestaAgregarSeries = new RespuestaEntity<boolean>();
	private respCrearPreferencia = new RespuestaEntity<RespuestaPedidoPreferencia>();


	public async crearPreferencia(
		usuario_id: number
	): Promise<RespuestaEntity<RespuestaPedidoPreferencia>> {
		await PedidoApi.crearPreferencia(usuario_id)
			.then((resp) => {
				this.respCrearPreferencia = {
					correcto: true,
					tipo: "success",
					mensaje: "correcto",
					data: resp.data.data,
				};
				
			});
		return this.respCrearPreferencia;
	}

	public async registrar(
		data: IPedidoCabeceraInterface
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
			.catch(() => {
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
			.catch(() => {
				return this.respuestaPedidoCabecera;
			});
		return this.respuestaPedidoCabecera;
	}

	public async listarPedidoUsuario(
		usuario_id: number
	): Promise<RespuestaEntity<PedidoCabeceraUsuarioProsp[]>> {
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
			.catch(() => {
				return this.respuestaArrayPedidoCabecera;
			});
		return this.respuestaArrayPedidoCabecera;
	}

	public async listarUno(
		pedido_id: number
	): Promise<RespuestaEntity<IPedidoCabeceraListarUno>> {
		await PedidoApi.listarUno(pedido_id)
			.then((resp) => {
				this.respuestaPedidoListarUno = {
					correcto: true,
					tipo: "success",
					mensaje: "correcto",
					data: resp.data.data,
				};
				return this.respuestaPedidoListarUno;
			})
			.catch(() => {
				return this.respuestaPedidoListarUno;
			});
		return this.respuestaPedidoListarUno;
	}

	public async agregarSeries(
		compra_detalle_id: number,
		data: IActualizaSerie[]
	): Promise<RespuestaEntity<boolean>> {
		await PedidoApi.agregarSeries(compra_detalle_id, data).then((resp) => {
			this.respuestaPedidoListarUno = {
				correcto: true,
				tipo: "success",
				mensaje: "correcto",
				data: resp.data.data,
			};
		});

		return this.respuestaAgregarSeries;
	}
}
