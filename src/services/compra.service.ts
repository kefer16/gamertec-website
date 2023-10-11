import { CompraApi } from "../apis/compra.api";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { CompraRegistra, ICompraCard, ICompraTable } from "../interfaces/compra.interface";

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
				correcto: true,
				tipo: "success",
				mensaje: "correcto",
				data: resp.data.data,
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
				correcto: true,
				tipo: "success",
				mensaje: "correcto",
				data: resp.data.data,
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
				correcto: true,
				tipo: "success",
				mensaje: "correcto",
				data: resp.data.data,
			};
		});

		return this.respuestaRegistrar;
	}
}
