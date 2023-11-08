import { DepartamentoApi } from "../apis/departamento.api";
import { DepartamentoEntity } from "../entities/departamento.entity";
import { ComboboxProps } from "../interfaces/combobox.interface";

export class DepartamentoService {
   static listarComboDepartamento = async (): Promise<ComboboxProps[]> => {
      const array: ComboboxProps[] = [];

      await DepartamentoApi.ListarTodos()
         .then((respuesta) => {
            respuesta.data.data.forEach((element: DepartamentoEntity) => {
               array.push({
                  valor: element.departamento_id,
                  descripcion: element.nombre,
               });
            });
         })
         .catch((error: any) => {});

      return array;
   };
}
