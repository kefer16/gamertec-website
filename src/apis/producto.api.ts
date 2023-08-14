import { ModeloEntity } from "../entities/modelo.entity";
import { ModeloPorFiltroProps } from "../interfaces/modelo.interface";

export const funcionListarModelosPorFiltro = async (
	categoria_id: number,
	nombre_modelo: string
): Promise<ModeloPorFiltroProps[]> => {
	let modelosFiltro: ModeloPorFiltroProps[] = [];

	await ModeloEntity.ListarModelosPorFiltro(categoria_id, nombre_modelo)
		.then((response) => {
			modelosFiltro = response.data.data;
		})
		.catch((error: Error) => {
			console.log(error);
		});

	return modelosFiltro;
};
