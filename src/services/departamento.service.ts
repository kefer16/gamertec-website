import { DepartamentoApi } from "../apis/departamento.api";
import { DepartamentoEntity } from "../entities/departamento.entity";
import { ComboboxProps } from "../interfaces/combobox.interface";

export class DepartamentoService {
   private apiDepartamento = new DepartamentoApi();

   private rspListarDepartamentoCombobox: ComboboxProps[] = [];

   async listarTodos(): Promise<ComboboxProps[]> {
      await this.apiDepartamento.listarTodos().then((resp) => {
         resp.data.data.forEach((element: DepartamentoEntity) => {
            this.rspListarDepartamentoCombobox.push({
               valor: element.departamento_id,
               descripcion: element.nombre,
            });
         });
      });
      return this.rspListarDepartamentoCombobox;
   }
}
