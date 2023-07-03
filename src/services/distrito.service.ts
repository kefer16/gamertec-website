import { DistritoApi } from "../apis/distrito.api";
import { DistritoEntity } from "../entities/distrito.entity";
import { ComboboxAnidadoProps } from "../interfaces/combobox.interface";

export class DistritoService {
	static listarComboDistrito = async (): Promise<ComboboxAnidadoProps[]> => {
		const array: ComboboxAnidadoProps[] = [];

		await DistritoApi.ListarTodos()
			.then((respuesta) => {
				respuesta.data.data.forEach((element: DistritoEntity) => {
					array.push({
						valor: element.distrito_id,
						valorAnidado: element.fk_provincia,
						descripcion: element.nombre,
					});
				});
			})
			.catch((error: any) => {
				console.log(error);
			});
		return array;
	};
}
