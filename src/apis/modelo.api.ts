import { ModeloEntity } from "../entities/modelo.entity";
import { ModeloDescripcionProps } from "../interfaces/modelo.interface";

export class ApiModelo {
	static ListarModeloDescripcion = async (
		modelo_id: number
	): Promise<ModeloDescripcionProps> => {
		let modelo: ModeloDescripcionProps = {} as ModeloDescripcionProps;

		await ModeloEntity.ListarModeloDescripcion(modelo_id)
			.then((respuesta) => {
				modelo = respuesta.data.data;
			})
			.catch((error) => {
				console.log(error);
			});

		return modelo;
	};
}
