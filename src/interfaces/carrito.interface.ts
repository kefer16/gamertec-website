export interface CarritoUsuarioProps {
	carrito_id: number;
	cantidad: number;
	fecha_registro: Date;
	activo: boolean;
	cls_modelo: {
		modelo_id: number;
		nombre: string;
		descripcion: string;
		foto: string;
		caracteristicas: string;
		color: string;
		precio: number;
		stock: number;
		cls_marca: {
			marca_id: number;
			nombre: string;
		};
	};
}

export interface CarritoCantidadUsuario{
	cantidad: number;
}