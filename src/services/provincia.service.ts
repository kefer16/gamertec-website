import { ProvinciaApi } from "../apis/provincia.api";
import { DropdownPropsAnidado } from "../components/admin/categoria/CategoriaRegistro";
import { ProvinciaEntity } from "../entities/provincia.entity";
export class ProvinciaService {
   private apiProvincia = new ProvinciaApi();

   private rspListarProvinciaCombobox: DropdownPropsAnidado[] = [];

   async listarTodos(): Promise<DropdownPropsAnidado[]> {
      await this.apiProvincia.listarTodos().then((resp) => {
         this.rspListarProvinciaCombobox.push({
            code: "0",
            codeAnidado: "0",
            name: "Selec. Provincia",
         });
         resp.data.data.forEach((element: ProvinciaEntity) => {
            this.rspListarProvinciaCombobox.push({
               code: String(element.provincia_id),
               codeAnidado: String(element.fk_departamento),
               name: element.nombre,
            });
         });
      });
      return this.rspListarProvinciaCombobox;
   }
}
