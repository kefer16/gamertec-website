const API_URL = process.env.REACT_APP_API_URL;

export class MarcaEntity {
   constructor(
      public marca_id: number = 0,
      public nombre: string = "",
      public activo: boolean = false,
      public fk_categoria: number = 0,
      public fecha_registro: string = ""
   ) {}

   public static url = `${API_URL}/marca`;
}
