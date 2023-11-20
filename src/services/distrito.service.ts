import { DistritoApi } from "../apis/distrito.api";
import { DropdownPropsAnidado } from "../components/admin/categoria/CategoriaRegistro";
import { DistritoEntity } from "../entities/distrito.entity";
export class DistritoService {
   private apiDistrito = new DistritoApi();

   private rspListarDistritoCombobox: DropdownPropsAnidado[] = [];

   async listarTodos(): Promise<DropdownPropsAnidado[]> {
      await this.apiDistrito.listarTodos().then((resp) => {
         resp.data.data.forEach((element: DistritoEntity) => {
            this.rspListarDistritoCombobox.push({
               code: String(element.distrito_id),
               codeAnidado: String(element.fk_provincia),
               name: element.nombre,
            });
         });
      });
      return this.rspListarDistritoCombobox;
   }
}
