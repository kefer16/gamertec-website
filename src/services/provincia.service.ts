import { ProvinciaApi } from "../apis/provincia.api";
import { ProvinciaEntity } from "../entities/provincia.entity";
import { ComboboxAnidadoProps } from "../interfaces/combobox.interface";
export class ProvinciaService {
   private apiProvincia = new ProvinciaApi();

   private rspListarProvinciaCombobox: ComboboxAnidadoProps[] = [];

   async listarTodos(): Promise<ComboboxAnidadoProps[]> {
      await this.apiProvincia.listarTodos().then((resp) => {
         resp.data.data.forEach((element: ProvinciaEntity) => {
            this.rspListarProvinciaCombobox.push({
               valor: element.provincia_id,
               valorAnidado: element.fk_departamento,
               descripcion: element.nombre,
            });
         });
      });
      return this.rspListarProvinciaCombobox;
   }
}
