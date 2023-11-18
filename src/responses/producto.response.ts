export interface ProductoResponse {
   producto_id: number;
   numero_serie: string;
   fk_modelo: number;
   fk_marca: number;
   fk_categoria: number;
   fecha_registro: string;
   activo: boolean;
   comprado: boolean;
}

export interface ProductoSerieResponse {
   producto_id: number;
   numero_serie: string;
   checked: boolean;
}
