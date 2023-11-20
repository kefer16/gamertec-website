import { MarcaApi } from "../apis/marca.api";
import { DropdownPropsAnidado } from "../components/admin/categoria/CategoriaRegistro";
import { MarcaEntity } from "../entities/marca.entities";
import { MarcaResponse } from "../responses/marca.response";

export class MarcaService {
   private apiMarca = new MarcaApi();

   private rspRegistar: MarcaResponse = {} as MarcaResponse;
   private rspActualizar: MarcaResponse = {} as MarcaResponse;
   private rspListarTodos: MarcaResponse[] = [];
   private rspHistorial: MarcaResponse[] = [];
   private rspBuscarPorId: MarcaResponse = {} as MarcaResponse;
   private rspEliminarUno: MarcaResponse = {} as MarcaResponse;
   private rspArrayAnidadoMarcaCombobox: DropdownPropsAnidado[] = [];

   public async registrar(data: MarcaEntity): Promise<MarcaResponse> {
      await this.apiMarca.registrar(data).then((resp) => {
         this.rspRegistar = resp.data.data;
      });
      return this.rspRegistar;
   }

   public async actualizar(
      marca_id: number,
      data: MarcaEntity
   ): Promise<MarcaResponse> {
      await this.apiMarca.actualizar(marca_id, data).then((resp) => {
         this.rspActualizar = resp.data.data;
      });
      return this.rspActualizar;
   }

   public async listarTodos(): Promise<MarcaResponse[]> {
      await this.apiMarca.listarTodos().then((resp) => {
         this.rspListarTodos = resp.data.data;
      });
      return this.rspListarTodos;
   }

   public async historial(marca_id: number): Promise<MarcaResponse[]> {
      await this.apiMarca.historial(marca_id).then((resp) => {
         this.rspHistorial = resp.data.data;
      });
      return this.rspHistorial;
   }

   public async buscarPorId(marca_id: number): Promise<MarcaResponse> {
      await this.apiMarca.buscarPorId(marca_id).then((resp) => {
         this.rspBuscarPorId = resp.data.data;
      });
      return this.rspBuscarPorId;
   }

   public async eliminarUno(marca_id: number): Promise<MarcaResponse> {
      await this.apiMarca.eliminarUno(marca_id).then((resp) => {
         this.rspEliminarUno = resp.data.data;
      });
      return this.rspEliminarUno;
   }

   public async obtenerMarcasCombobox(): Promise<DropdownPropsAnidado[]> {
      await this.apiMarca.listarTodos().then((resp) => {
         resp.data.data.forEach((element: MarcaResponse) => {
            this.rspArrayAnidadoMarcaCombobox.push({
               codeAnidado: String(element.fk_categoria),
               code: String(element.marca_id),
               name: element.nombre,
            });
         });
      });
      return this.rspArrayAnidadoMarcaCombobox;
   }
}
