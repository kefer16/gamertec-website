import { ModeloService } from "../services/ModeloService";
export class ApiModelo {
	static BuscarPorID = async (modelo_id: number): Promise<ModeloService> => {
		let modelo: ModeloService = new ModeloService();

		await ModeloService.BuscarPorID(modelo_id)
			.then((respuesta) => {
				modelo = respuesta.data.data[0];
				console.log(modelo);
			})
			.catch((error) => {
				console.log(error);
			});

		return modelo;
	};
}
