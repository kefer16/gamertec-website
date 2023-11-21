import {
   ColumnaEstadoProps,
   TablaEstructuraColumnaProps,
   TablaTipoColumna,
} from "./tabla.table";

export interface ColumnasProducto {
   id: number;
   index: number;
   fecha_registro: string;
   categoria_id: number;
   categoria_nombre?: string;
   marca_id: number;
   marca_nombre?: string;
   modelo_id: number;
   modelo_nombre?: string;
   numero_serie: string;
   estado: ColumnaEstadoProps;
}

export const arrayEstructuraColumnasProducto: TablaEstructuraColumnaProps[] = [
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
      type: TablaTipoColumna.TEXT,
      field: "numero_serie",
      header: "Número Serie",
      style: { width: "5%" },
   },
   {
      type: TablaTipoColumna.STATUS,
      field: "estado",
      header: "Estado",
      style: { width: "4%" },
   },
];

export const arrayColumnasFiltroProducto: string[] = [
   "fecha_registro",
   "categoria_nombre",
   "marca_nombre",
   "modelo_nombre",
   "numero_serie",
   "estado.estado",
];
