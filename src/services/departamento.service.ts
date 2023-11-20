import { DepartamentoApi } from "../apis/departamento.api";
import { DropdownProps } from "../components/admin/categoria/CategoriaRegistro";
import { DepartamentoEntity } from "../entities/departamento.entity";
export class DepartamentoService {
   private apiDepartamento = new DepartamentoApi();

   private rspListarDepartamentoCombobox: DropdownProps[] = [];

   async listarTodos(): Promise<DropdownProps[]> {
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
