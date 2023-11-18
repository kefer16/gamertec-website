const API_URL = process.env.REACT_APP_API_URL;

export class ContactoEntity {
   constructor(
      public contacto_id: number = 0,
      public fecha_registro: string = "",
      public nombre = "",
      public correo = "",
      public mensaje = ""
   ) {}

   public static url = `${API_URL}/contacto`;
}
