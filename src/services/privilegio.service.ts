import { PrivilegioApi } from "../apis/privilegio.api";
import { PrivilegioEntity } from "../entities/privilegio.entities";
import { ComboboxProps } from "../interfaces/combobox.interface";
import { PrivilegioResponse } from "../responses/privilegio.response";

export class PrivilegioService {
   private apiPrivilegio = new PrivilegioApi();

   private rspRegistar: PrivilegioResponse = {} as PrivilegioResponse;
   private rspActualizar: PrivilegioResponse = {} as PrivilegioResponse;
   private rspListarTodos: PrivilegioResponse[] = [];
   private rspHistorial: PrivilegioResponse[] = [];
   private rspBuscarPorId: PrivilegioResponse = {} as PrivilegioResponse;
   private rspEliminarUno: PrivilegioResponse = {} as PrivilegioResponse;
   private rspArrayCombobox: ComboboxProps[] = [];

   public async registrar(data: PrivilegioEntity): Promise<PrivilegioResponse> {
      await this.apiPrivilegio.registrar(data).then((resp) => {
         this.rspRegistar = resp.data.data;
      });
      return this.rspRegistar;
   }

   public async actualizar(
      privilegio_id: number,
      data: PrivilegioEntity
   ): Promise<PrivilegioResponse> {
      await this.apiPrivilegio.actualizar(privilegio_id, data).then((resp) => {
         this.rspActualizar = resp.data.data;
      });
      return this.rspActualizar;
   }

   public async listarTodos(): Promise<PrivilegioResponse[]> {
      await this.apiPrivilegio.listarTodos().then((resp) => {
         this.rspListarTodos = resp.data.data;
      });
      return this.rspListarTodos;
   }

   public async historial(
      privilegio_id: number
   ): Promise<PrivilegioResponse[]> {
      await this.apiPrivilegio.historial(privilegio_id).then((resp) => {
         this.rspHistorial = resp.data.data;
      });
      return this.rspHistorial;
   }

   public async buscarPorId(
      privilegio_id: number
   ): Promise<PrivilegioResponse> {
      await this.apiPrivilegio.buscarPorId(privilegio_id).then((resp) => {
         this.rspBuscarPorId = resp.data.data;
      });
      return this.rspBuscarPorId;
   }

   public async eliminarUno(
      privilegio_id: number
   ): Promise<PrivilegioResponse> {
      await this.apiPrivilegio.eliminarUno(privilegio_id).then((resp) => {
         this.rspEliminarUno = resp.data.data;
      });
      return this.rspEliminarUno;
   }

   public async obtenerPrivilegiosCombobox(): Promise<ComboboxProps[]> {
      await this.apiPrivilegio.listarTodos().then((resp) => {
         resp.data.data.forEach((element: PrivilegioResponse) => {
            this.rspArrayCombobox.push({
               code: String(element.privilegio_id),
               name: element.tipo,
            });
         });
      });
      return this.rspArrayCombobox;
   }
}
