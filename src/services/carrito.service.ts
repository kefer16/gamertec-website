import { CarritoApi } from "../apis/carrito.api";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { CarritoCantidadUsuario, CarritoUsuarioProps } from "../interfaces/carrito.interface";

export class CarritoService {
	private respObtenerCantidadCarrito = new RespuestaEntity<CarritoCantidadUsuario[]>;

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
}
