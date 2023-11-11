import axios, { AxiosResponse } from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export class ProductoService {
   constructor(
      public producto_id: number = 0,
      public numero_serie: string = "",
      public fk_modelo: number = 0,
      public fk_marca: number = 0,
      public fk_categoria: number = 0,
      public fecha_registro: string = "",
      public activo: boolean = false,
      public comprado: boolean = false
   ) {}

   public static url = `${API_URL}/producto`;

   static async Registrar(data: ProductoService): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };

         const body = JSON.stringify(data);

         return await axios.post(`${this.url}/registrar`, body, config);
      } catch (err: any) {
         return Promise.reject(err);
      }
   }

   static async Actualizar(
      ID: number,
      data: ProductoService
   ): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               producto_id: ID,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.put(`${this.url}/actualizar`, body, config);
      } catch (err: any) {
         return Promise.reject(err);
      }
   }

   static async ListarTodos(): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };

         return await axios.get(`${this.url}/todos`, config);
      } catch (err: any) {
         return Promise.reject(err);
      }
   }

   static async Historial(ID: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               producto_id: ID,
            },
            headers: {
               "Content-Type": "application/json",
            },
         };

         return await axios.get(`${this.url}/historial`, config);
      } catch (err: any) {
         return Promise.reject(err);
      }
   }

   static async BuscarPorID(ID: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               producto_id: ID,
            },
         };
         return await axios.get(`${this.url}/uno`, config);
      } catch (err: any) {
         return Promise.reject(err);
      }
   }
   static async EliminarUno(ID: number): Promise<AxiosResponse> {
      try {
         const config = {
            params: {
               producto_id: ID,
            },
         };
         return await axios.delete(`${this.url}/eliminar`, config);
      } catch (err: any) {
         return Promise.reject(err);
      }
   }
}
