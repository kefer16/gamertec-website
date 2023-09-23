export interface ModeloPorFiltroProps {
	modelo_id: number;
	nombre: string;
	descripcion: string;
	foto: string;
	caracteristicas: string;
	color: string;
	precio: number;
	stock: number;
	cls_marca: { nombre: string; marca_id: number };
}

export interface ModeloDescripcionProps {
	modelo_id: number;
	nombre: string;
	descripcion: string;
	foto: string;
	caracteristicas: string;
	color: string;
	precio: number;
	stock: number;
	cls_marca: {
		nombre: string;
		marca_id: number;
		cls_categoria: {
			categoria_id: number;
			nombre: string;
		};
	};
	_count: {
		lst_producto: number;
	}
}
