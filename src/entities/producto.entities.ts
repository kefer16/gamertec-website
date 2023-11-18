const API_URL = process.env.REACT_APP_API_URL;

export class ProductoEntity {
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
}
