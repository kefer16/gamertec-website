const API_URL = process.env.REACT_APP_API_URL;

export class PrivilegioEntity {
   constructor(
      public privilegio_id: number = 0,
      public tipo: string = "",
      public activo: boolean = false,
      public abreviatura: string = "",
      public fecha_registro: string = ""
   ) {}

   public static url = `${API_URL}/privilegio`;
}
