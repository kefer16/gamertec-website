const API_URL = process.env.REACT_APP_API_URL;

export class UsuarioEntity {
   constructor(
      public usuario_id: number = 0,
      public nombre: string = "",
      public apellido: string = "",
      public correo: string = "",
      public usuario: string = "",
      public contrasenia: string = "",
      public foto: string = "",
      public fecha_registro: string = "",
      public direccion: string = "",
      public telefono: string = "",
      public activo: boolean = false,
      public fk_privilegio: number = 0,
      public fecha_inicial: string = "",
      public fecha_final: string = ""
   ) {}
   public index = 0;
   public static url = `${API_URL}/usuario`;
}
