import { CarritoApi } from "../apis/carrito.api";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { CarritoCantidadUsuario, CarritoUsuarioProps } from "../interfaces/carrito.interface";

export class CarritoService {
	private respObtenerCantidadCarrito = new RespuestaEntity<CarritoCantidadUsuario[]>;
	private respEliminarModeloCarrito = new RespuestaEntity<number[]>;
	private respActualizarCantidadCarrito = new RespuestaEntity<number[]>;

	static listarCaracteristicas = async (
		usuario_id: number
	): Promise<CarritoUsuarioProps[]> => {
		let arrayCarrito: CarritoUsuarioProps[] = [];

		await CarritoApi.ObtenerCarritoPorUsuario(usuario_id)
			.then((respuesta) => {
				arrayCarrito = respuesta.data.data;
			})
			.catch((error) => {
				console.log(error);
			});

		return arrayCarrito;
	};

	async obtenerCantidadCarrito(usuario_id: number): Promise<RespuestaEntity<CarritoCantidadUsuario[]>> {
		const apiCarrito = new CarritoApi();

		await apiCarrito.obtenerCantidadCarrito(usuario_id).then((resp) => {
			this.respObtenerCantidadCarrito = {
				correcto: true,
				tipo: "success",
				mensaje: "correcto",
				data: resp.data.data,
			};
		});
		return this.respObtenerCantidadCarrito;

	}
	async eliminarModeloCarrito(carrito_id: number, usuario_id: number): Promise<RespuestaEntity<number[]>> {
		const apiCarrito = new CarritoApi();

		await apiCarrito.eliminarModeloCarrito(carrito_id, usuario_id).then((resp) => {
			this.respObtenerCantidadCarrito = {
				correcto: true,
				tipo: "success",
				mensaje: "correcto",
				data: resp.data.data,
			};
		});
		return this.respEliminarModeloCarrito;

	}

	async actualizarCantidadCarrito(carrito_id: number, cantidad: number, usuario_id: number): Promise<RespuestaEntity<number[]>> {
		const apiCarrito = new CarritoApi();

		await apiCarrito.actualizarCantidadCarrito(carrito_id, cantidad, usuario_id).then((resp) => {
			this.respObtenerCantidadCarrito = {
				correcto: true,
				tipo: "success",
				mensaje: "correcto",
				data: resp.data.data,
			};
		});
		return this.respActualizarCantidadCarrito;

	}
}
