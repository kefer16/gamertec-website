import { MarcaService } from "../entities/marca.entities";
import { ModeloService } from "../entities/modelo.entities";

export interface ModelosFiltroProps {
	modelo: ModeloService;
	marca: MarcaService;
}

export const funcionListarModelosPorFiltro = async (
	categoria_id: number,
	nombre_modelo: string
): Promise<ModelosFiltroProps[]> => {
	let modelosFiltro: ModelosFiltroProps[] = [];

	await ModeloService.ListarModelosPorFiltro(categoria_id, nombre_modelo)
		.then((response) => {
			modelosFiltro = response.data.data;
		})
		.catch((error: Error) => {
			console.log(error);
		});

	return modelosFiltro;
};
