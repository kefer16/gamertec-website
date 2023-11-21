import {
   ColumnaEstadoProps,
   TablaEstructuraColumnaProps,
   TablaTipoColumna,
} from "./tabla.table";

export interface ColumnasCategoria {
   id: number;
   index: number;
   categoria_nombre: string;
   fecha_registro: string;
   fecha_actualizacion: string;
   estado: ColumnaEstadoProps;
}

export const arrayEstructuraColumnasCategoria: TablaEstructuraColumnaProps[] = [
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
      style: { width: "5%" },
   },
   {
      type: TablaTipoColumna.TEXT,
      field: "categoria_nombre",
      header: "Categoria",
      style: { width: "5%" },
   },
   {
      type: TablaTipoColumna.STATUS,
      field: "estado",
      header: "Estado",
      style: { width: "15%" },
   },
];

export const arrayColumnasFiltroCategoria: string[] = [
   "fecha_registro",
   "categoria_nombre",
   "estado.estado",
];
