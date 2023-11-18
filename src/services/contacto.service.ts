import { ContactoApi } from "../apis/contacto.api";
import { ContactoEntity } from "../entities/contacto.entity";
import { ContactoResponse } from "../responses/contacto.response";

export class ContactoService {
   private apiContato = new ContactoApi();

   private rspListarTodos: ContactoResponse[] = [];
   private rspListarUno: ContactoResponse = {} as ContactoResponse;
   private rspRegistrar: ContactoResponse = {} as ContactoResponse;
   private rspActualizar: ContactoResponse = {} as ContactoResponse;
   private rspEliminar: ContactoResponse = {} as ContactoResponse;

   public async listarTodos(): Promise<ContactoResponse[]> {
      await this.apiContato.listarTodos().then((resp) => {
         this.rspListarTodos = resp.data.data;
      });

      return this.rspListarTodos;
   }

   public async listarUno(contacto_id: number): Promise<ContactoResponse> {
      await this.apiContato.listarUno(contacto_id).then((resp) => {
         this.rspListarUno = resp.data.data;
      });

      return this.rspListarUno;
   }

   public async registrar(data: ContactoEntity): Promise<ContactoResponse> {
      await this.apiContato.registrar(data).then((resp) => {
         this.rspRegistrar = resp.data.data;
      });

      return this.rspRegistrar;
   }

   public async actualizar(
      contacto_id: number,
      data: ContactoEntity
   ): Promise<ContactoResponse> {
      await this.apiContato.actualizar(contacto_id, data).then((resp) => {
         this.rspActualizar = resp.data.data;
      });

      return this.rspActualizar;
   }

   public async eliminar(contacto_id: number): Promise<ContactoResponse> {
      await this.apiContato.eliminar(contacto_id).then((resp) => {
         this.rspEliminar = resp.data.data;
      });

      return this.rspEliminar;
   }
}
