const API_URL = process.env.REACT_APP_API_URL;

export class ComentarioEntity {
   constructor(
      public comentario_id: number = 0,
      public valoracion: number = 0,
      public usuario: string = "",
      public titulo: string = "",
      public mensaje: string = "",
      public fecha_registro: string = "",
      public activo: boolean = false,
      public fk_usuario: number = 0,
      public fk_modelo: number = 0
   ) {}

   public static url = `${API_URL}/comentario`;
}
