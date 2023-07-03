import { CarritoApi } from "../apis/carrito.api";
import { CarritoCaracteristicasProps } from "../interfaces/carrito.interface";

export class CarritoService {
	static listarCaracteristicas = async (
		usuario_id: number
	): Promise<CarritoCaracteristicasProps[]> => {
		let arrayCarrito: CarritoCaracteristicasProps[] = [];

		await CarritoApi.ObtenerCarritoPorUsuario(usuario_id)
			.then((respuesta) => {
				arrayCarrito = respuesta.data.data;
			})
			.catch((error) => {
				console.log(error);
			});

		return arrayCarrito;
	};
}
