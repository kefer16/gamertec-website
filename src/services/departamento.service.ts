import { DepartamentoApi } from "../apis/departamento.api";
import { DepartamentoEntity } from "../entities/departamento.entity";
import { ComboboxProps } from "../interfaces/combobox.interface";
export class DepartamentoService {
   private apiDepartamento = new DepartamentoApi();

   private rspListarDepartamentoCombobox: ComboboxProps[] = [];

   async listarTodos(): Promise<ComboboxProps[]> {
      await this.apiDepartamento.listarTodos().then((resp) => {
         this.rspListarDepartamentoCombobox.push({
            code: "0",
            name: "Selec. Departamento",
         });
         resp.data.data.forEach((element: DepartamentoEntity) => {
            this.rspListarDepartamentoCombobox.push({
               code: String(element.departamento_id),
               name: element.nombre,
            });
         });
      });
      return this.rspListarDepartamentoCombobox;
   }
}
