import { DistritoApi } from "../apis/distrito.api";
import { DistritoEntity } from "../entities/distrito.entity";
import { ComboboxAnidadoProps } from "../interfaces/combobox.interface";
export class DistritoService {
   private apiDistrito = new DistritoApi();

   private rspListarDistritoCombobox: ComboboxAnidadoProps[] = [];

   async listarTodos(): Promise<ComboboxAnidadoProps[]> {
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
