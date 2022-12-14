class Usuario {
	private id_usuario: string;
	private nombre: string;
	private apellido_paterno: string;
	private apellido_materno: string;
	private usuario: string;
	private contrasenia: string;
	private dinero: number;
	private foto: string;
	private fecha_registro: Date;
	private activo: boolean;
	private id_privilegio: number;

	constructor(
		id_usuario: string,
		nombre: string,
		apellido_paterno: string,
		apellido_materno: string,
		usuario: string,
		contrasenia: string,
		dinero: number,
		foto: string,
		activo: boolean,
		id_privilegio: number
	) {
		this.id_usuario = id_usuario;
		this.nombre = nombre;
		this.apellido_paterno = apellido_paterno;
		this.apellido_materno = apellido_materno;
		this.usuario = usuario;
		this.contrasenia = contrasenia;
		this.dinero = dinero;
		this.foto = foto;
		this.fecha_registro = new Date();
		this.activo = activo;
		this.id_privilegio = id_privilegio;
	}
}

export default Usuario;
