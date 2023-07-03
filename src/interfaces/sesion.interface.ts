export interface SesionGamertec {
	usuario: SesionUsuario;
	privilegio: SesionPrivilegio;
}

export interface SesionUsuario {
	usuario_id: number;
	usuario: string;
	correo: string;
	nombre: string;
	apellido: string;
	foto: string;
}

export interface SesionPrivilegio {
	privilegio_id: number;
	nombre: string;
	abreviatura: string;
}
