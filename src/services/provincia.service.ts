import { ProvinciaApi } from "../apis/provincia.api";
import { ProvinciaEntity } from "../entities/provincia.entity";
import { ComboboxAnidadoProps } from "../interfaces/combobox.interface";
export class ProvinciaService {
   private apiProvincia = new ProvinciaApi();

   private rspListarProvinciaCombobox: ComboboxAnidadoProps[] = [];

   async listarTodos(): Promise<ComboboxAnidadoProps[]> {
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
