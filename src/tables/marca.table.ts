import {
   ColumnaEstadoProps,
   TablaEstructuraColumnaProps,
   TablaTipoColumna,
} from "./tabla.table";

export interface ColumnasMarca {
   id: number;
   index: number;
   fecha_registro: string;
   categoria_id: number;
   categoria_nombre?: string;
   marca_nombre: string;
   estado: ColumnaEstadoProps;
}

export const arrayEstructuraColumnasMarca: TablaEstructuraColumnaProps[] = [
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
      type: TablaTipoColumna.STATUS,
      field: "estado",
      header: "Estado",
      style: { width: "20%" },
   },
];

export const arrayColumnasFiltroMarca: string[] = [
   "fecha_registro",
   "categoria_nombre",
   "marca_nombre",
   "estado.estado",
];
