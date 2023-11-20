const API_URL = process.env.REACT_APP_API_URL;
export class ModeloEntity {
   constructor(
      public modelo_id: number = 0,
      public nombre: string = "",
      public descripcion: string = "",
      public foto: string = "",
      public caracteristicas: string = "",
      public color: string = "",
      public precio: number = 0,
      public fecha_registro: string = "",
      public activo: boolean = false,
      public fk_marca: number = 0,
      public fk_categoria: number = 0
   ) {}

   public static url = `${API_URL}/modelo`;
}
