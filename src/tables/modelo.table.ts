import {
   ColumnaEstadoProps,
   ColumnaImagenProps,
   TablaEstructuraColumnaProps,
   TablaTipoColumna,
} from "./tabla.table";

export interface ColumnasModelo {
   id: number;
   index: number;
   fecha_registro: string;
   categoria_id: number;
   categoria_nombre?: string;
   marca_id: number;
   marca_nombre?: string;
   modelo_nombre: string;
   producto_nombre: string;
   foto: ColumnaImagenProps;
   precio: number;
   color: string;
   caracteristicas: string;
   estado: ColumnaEstadoProps;
}

export const arrayEstructuraColumnasModelo: TablaEstructuraColumnaProps[] = [
   {
      type: TablaTipoColumna.TEXT,
      field: "index",
      header: "N°",
      style: { width: "1%" },
   },
   {
      type: TablaTipoColumna.DATE,
      field: "fecha_registro",
      header: "Fecha Registro",
      style: { width: "10%" },
   },
   {
      type: TablaTipoColumna.TEXT,
      field: "categoria_nombre",
      header: "Categoria",
      style: { width: "5%" },
   },
   {
      type: TablaTipoColumna.TEXT,
      field: "marca_nombre",
      header: "Marca",
      style: { width: "5%" },
   },
   {
      type: TablaTipoColumna.TEXT,
      field: "modelo_nombre",
      header: "Modelo",
      style: { width: "10%" },
   },
   {
      type: TablaTipoColumna.IMAGE,
      field: "foto",
      header: "Foto",
      style: { width: "1%" },
   },
   {
      type: TablaTipoColumna.TEXT,
      field: "producto_nombre",
      header: "Nombre Producto",
      style: { width: "15%" },
   },
   {
      type: TablaTipoColumna.MONEY,
      field: "precio",
      header: "Precio",
      style: { width: "4%" },
   },
   {
      type: TablaTipoColumna.STATUS,
      field: "estado",
      header: "Estado",
      style: { width: "4%" },
   },
];

export const arrayColumnasFiltroModelo: string[] = [
   "fecha_registro",
   "categoria_nombre",
   "marca_nombre",
   "modelo_nombre",
   "producto_nombre",
   "precio",
   "caracteristicas",
   "estado.estado",
];
