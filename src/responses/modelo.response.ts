export interface ModeloResponse {
   modelo_id: number;
   nombre: string;
   descripcion: string;
   foto: string;
   caracteristicas: string;
   color: string;
   precio: number;
   fecha_registro: string;
   activo: boolean;
   fk_marca: number;
   fk_categoria: number;
}

export interface ModeloDescripcionResponse {
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
   };
}

export interface ModeloPorFiltroResponse {
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
