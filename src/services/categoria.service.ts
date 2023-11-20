import { CategoriaApi } from "../apis/categoria.api";
import { DropdownProps } from "../components/admin/categoria/CategoriaRegistro";
import { CategoriaEntity } from "../entities/categoria.entities";
import { CategoriaResponse } from "../responses/categoria.response";

export class CategoriaService {
   private apiCategoria = new CategoriaApi();

   private rspRegistar: CategoriaResponse = {} as CategoriaResponse;
   private rspActualizar: CategoriaResponse = {} as CategoriaResponse;
   private rspListarTodos: CategoriaResponse[] = [];
   private rspHistorial: CategoriaResponse[] = [];
   private rspEliminarUno: CategoriaResponse = {} as CategoriaResponse;
   private rspArrayCategoriaCombobox: DropdownProps[] = [];

   public async registrar(data: CategoriaEntity): Promise<CategoriaResponse> {
      await this.apiCategoria.registrar(data).then((resp) => {
         this.rspRegistar = resp.data.data;
      });
      return this.rspRegistar;
   }

   public async actualizar(
      categoria_id: number,
      data: CategoriaEntity
   ): Promise<CategoriaResponse> {
      await this.apiCategoria.actualizar(categoria_id, data).then((resp) => {
         this.rspActualizar = resp.data.data;
      });
      return this.rspActualizar;
   }

   public async listarTodos(): Promise<CategoriaResponse[]> {
      await this.apiCategoria.listarTodos().then((resp) => {
         this.rspListarTodos = resp.data.data;
      });
      return this.rspListarTodos;
   }

   public async historial(categoria_id: number): Promise<CategoriaResponse[]> {
      await this.apiCategoria.historial(categoria_id).then((resp) => {
         this.rspHistorial = resp.data.data;
      });
      return this.rspHistorial;
   }

   public async eliminarUno(categoria_id: number): Promise<CategoriaResponse> {
      await this.apiCategoria.eliminarUno(categoria_id).then((resp) => {
         this.rspEliminarUno = resp.data.data;
      });
      return this.rspEliminarUno;
   }
   public async obtenerCategoriasCombobox(): Promise<DropdownProps[]> {
      await this.apiCategoria.listarTodos().then((resp) => {
         this.rspArrayCategoriaCombobox.push({
            code: "0",
            name: "Seleccione Opción",
         });
         resp.data.data.forEach((element: CategoriaResponse) => {
            this.rspArrayCategoriaCombobox.push({
               code: String(element.categoria_id),
               name: element.nombre,
            });
         });
      });
      return this.rspArrayCategoriaCombobox;
   }
}
