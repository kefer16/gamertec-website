export interface LogeoUsuario {
   usuario_id: number;
   nombre: string;
   apellido: string;
   correo: string;
   usuario: string;
   dinero: number;
   foto: string;
   activo: boolean;
   fk_privilegio: number;
   direccion: string;
   telefono: string;
}

export interface ActualizaNombreUsuario {
   nombre: string;
}

export interface ActualizaApellidoUsuario {
   apellido: string;
}
export interface ActualizaCorreoUsuario {
   correo: string;
}
export interface ActualizaDireccionUsuario {
   direccion: string;
}

export interface ActualizaFotoUsuario {
   foto: string;
}
