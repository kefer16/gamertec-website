import {
   ColumnaEstadoProps,
   TablaEstructuraColumnaProps,
   TablaTipoColumna,
} from "./tabla.table";

export interface ColumnasPrivilegio {
   id: number;
   index: number;
   fecha_registro: string;
   tipo: string;
   abreviatura: string;
   estado: ColumnaEstadoProps;
}

export const arrayEstruturaColumnasPrivilegio: TablaEstructuraColumnaProps[] = [
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
      field: "tipo",
      header: "Tipo",
      style: { width: "5%" },
   },
   {
      type: TablaTipoColumna.TEXT,
      field: "abreviatura",
      header: "Abreviatura",
      style: { width: "5%" },
   },
   {
      type: TablaTipoColumna.STATUS,
      field: "estado",
      header: "Estado",
      style: { width: "10%" },
   },
];

export const arrayColumnasFiltroPrivilegio: string[] = [
   "fecha_registro",
   "tipo",
   "abreviatura",
   "estado.estado",
];
