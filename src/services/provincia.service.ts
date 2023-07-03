import { ProvinciaApi } from "../apis/provincia.api";
import { ProvinciaEntity } from "../entities/provincia.entity";
import { ComboboxAnidadoProps } from "../interfaces/combobox.interface";
export class ProvinciaService {
	static listarComboProvincia = async (): Promise<ComboboxAnidadoProps[]> => {
		const array: ComboboxAnidadoProps[] = [];

		await ProvinciaApi.ListarTodos()
			.then((respuesta) => {
				respuesta.data.data.forEach((element: ProvinciaEntity) => {
					array.push({
						valor: element.provincia_id,
						valorAnidado: element.fk_departamento,
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
