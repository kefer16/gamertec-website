const API_URL = process.env.REACT_APP_API_URL;
export class CategoriaEntity {
   constructor(
      public categoria_id: number = 0,
      public nombre: string = "",
      public activo: boolean = false,
      public fecha_registro: string = "",
      public fecha_actualizacion: string = ""
   ) {}
   public static url = `${API_URL}/categoria`;
}
