import { CategoryService } from "../entities/categoria.entities";
import { MarcaService } from "../entities/marca.entities";
import { ModeloService } from "../entities/modelo.entities";

export interface ModeloDescripcion {
	categoria: CategoryService;
	marca: MarcaService;
	modelo: ModeloService;
}
export class ApiModelo {
	static ListarModeloDescripcion = async (
		modelo_id: number
	): Promise<ModeloDescripcion> => {
		let modelo: ModeloDescripcion = {
			categoria: new CategoryService(),
			marca: new MarcaService(),
			modelo: new ModeloService(),
		};

		await ModeloService.ListarModeloDescripcion(modelo_id)
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
