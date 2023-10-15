import { CompraEstadoApi } from "../apis/compra_estado.api";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { CompraEstadoListaTodos, CompraEstadoListaUno } from "../interfaces/compra_estado.interface";

export class CompraEstadoService {
	private _apiCompraEstado = new CompraEstadoApi();
    
	private respListarTodos = new RespuestaEntity<CompraEstadoListaTodos[]>();
	private respListarUno = new RespuestaEntity<CompraEstadoListaUno>();
	
	
	public async listarTodos(): Promise<RespuestaEntity<CompraEstadoListaTodos[]>> {

		await this._apiCompraEstado.listarTodos()
			.then((resp) => {
				this.respListarTodos = {
					correcto: true,
					tipo: "success",
					mensaje: "correcto",
					data: resp.data.data,
				};
			});
		return this.respListarTodos;
	}

	public async listarUno(compra_estado_id: number): Promise<RespuestaEntity<CompraEstadoListaUno>> {

		await this._apiCompraEstado.listarUno(compra_estado_id)
			.then((resp) => {
				this.respListarUno = {
					correcto: true,
					tipo: "success",
					mensaje: "correcto",
					data: resp.data.data,
				};
			});
		return this.respListarUno;
	}
}
