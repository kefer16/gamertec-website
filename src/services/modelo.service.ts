import { ModeloApi } from "../apis/modelo.api";
import { ModeloEntity } from "../entities/modelo.entity";
import { ComboboxAnidadoProps } from "../interfaces/combobox.interface";
import {
   ModeloDescripcionResponse,
   ModeloPorFiltroResponse,
   ModeloResponse,
} from "../responses/modelo.response";

export class ModeloService {
   private apiModelo = new ModeloApi();

   private rspRegistar: ModeloResponse = {} as ModeloResponse;
   private rspActualizar: ModeloResponse = {} as ModeloResponse;
   private rspListarTodos: ModeloResponse[] = [];
   private rspHistorial: ModeloResponse[] = [];
   private rspBuscarPorId: ModeloResponse = {} as ModeloResponse;
   private rspEliminarUno: ModeloResponse = {} as ModeloResponse;

   private rspListarModeloPorFiltro: ModeloPorFiltroResponse[] = [];
   private rspListarModeloDescripcion: ModeloDescripcionResponse =
      {} as ModeloDescripcionResponse;
   private rspArrayAnidadoModeloCombobox: ComboboxAnidadoProps[] = [];

   public async registrar(data: ModeloEntity): Promise<ModeloResponse> {
      await this.apiModelo.registrar(data).then((resp) => {
         this.rspRegistar = resp.data.data;
      });
      return this.rspRegistar;
   }

   public async actualizar(
      modelo_id: number,
      data: ModeloEntity
   ): Promise<ModeloResponse> {
      await this.apiModelo.actualizar(modelo_id, data).then((resp) => {
         this.rspActualizar = resp.data.data;
      });
      return this.rspActualizar;
   }

   public async listarTodos(): Promise<ModeloResponse[]> {
      await this.apiModelo.listarTodos().then((resp) => {
         this.rspListarTodos = resp.data.data;
      });
      return this.rspListarTodos;
   }

   public async historial(modelo_id: number): Promise<ModeloResponse[]> {
      await this.apiModelo.historial(modelo_id).then((resp) => {
         this.rspHistorial = resp.data.data;
      });
      return this.rspHistorial;
   }

   public async buscarPorId(modelo_id: number): Promise<ModeloResponse> {
      await this.apiModelo.buscarPorId(modelo_id).then((resp) => {
         this.rspBuscarPorId = resp.data.data;
      });
      return this.rspBuscarPorId;
   }

   public async eliminarUno(modelo_id: number): Promise<ModeloResponse> {
      await this.apiModelo.eliminarUno(modelo_id).then((resp) => {
         this.rspEliminarUno = resp.data.data;
      });
      return this.rspEliminarUno;
   }

   public async listarModelosPorFiltro(
      categoria_id: number,
      nombre_modelo: string
   ): Promise<ModeloPorFiltroResponse[]> {
      await this.apiModelo
         .listarModelosPorFiltro(categoria_id, nombre_modelo)
         .then((resp) => {
            this.rspListarModeloPorFiltro = resp.data.data;
         });
      return this.rspListarModeloPorFiltro;
   }

   async listarModeloDescripcion(
      modelo_id: number
   ): Promise<ModeloDescripcionResponse> {
      await this.apiModelo.listarModeloDescripcion(modelo_id).then((resp) => {
         this.rspListarModeloDescripcion = resp.data.data;
      });
      return this.rspListarModeloDescripcion;
   }

   async listarModeloCombobox(): Promise<ComboboxAnidadoProps[]> {
      await this.apiModelo.listarTodos().then((resp) => {
         resp.data.data.forEach((element: ModeloEntity) => {
            this.rspArrayAnidadoModeloCombobox.push({
               codeAnidado: String(element.fk_marca),
               code: String(element.modelo_id),
               name: element.nombre,
            });
         });
      });
      return this.rspArrayAnidadoModeloCombobox;
   }
}
