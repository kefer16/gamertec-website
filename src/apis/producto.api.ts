import { MarcaService } from "../entities/marca.entities";
import { ModeloEntity } from "../entities/modelo.entity";

export interface ModelosFiltroProps {
	modelo: ModeloEntity;
	marca: MarcaService;
}

export const funcionListarModelosPorFiltro = async (
	categoria_id: number,
	nombre_modelo: string
): Promise<ModelosFiltroProps[]> => {
	let modelosFiltro: ModelosFiltroProps[] = [];

	await ModeloEntity.ListarModelosPorFiltro(categoria_id, nombre_modelo)
		.then((response) => {
			modelosFiltro = response.data.data;
		})
		.catch((error: Error) => {
			console.log(error);
		});

	return modelosFiltro;
};
