export interface ICompraCard {
   compra_cabecera_id: number;
   codigo: string;
   sub_total: number;
   costo_envio: number;
   total: number;
   fecha_registro: Date;
   activo: boolean;
   fk_compra_estado: number;
   lst_compra_detalle: ICompraDetalleCard[];
}

export interface ICompraDetalleCard {
   cantidad: number;
   precio: number;
   total: number;
   fecha_registro: Date;
   activo: boolean;
   cls_modelo: IModeloCard[];
}

interface IModeloCard {
   foto: string;
   nombre: string;
}

export interface ICompraTable {
   compra_cabecera_id: number;
   codigo: string;
   direccion: string;
   telefono: string;
   sub_total: number;
   costo_envio: number;
   total: number;
   fecha_registro: Date;
   activo: boolean;
   cls_compra_estado: {
      abreviatura: string;
      nombre: string;
   };
   lst_compra_detalle: ICompraDetalleTable[];
}

export interface ICompraDetalleTable {
   compra_detalle_id: number;
   item: number;
   cantidad: number;
   precio: number;
   total: number;
   fecha_registro: Date;
   activo: boolean;
   cls_modelo: IModeloCard;
}

export interface IModeloTable {
   foto: string;
   nombre: string;
}

export interface CompraRegistra {
   preferencia_id: string;
   estado: string;
   pago_id: string;
   usuario_id: number;
}
