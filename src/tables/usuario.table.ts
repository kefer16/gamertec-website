import {
   ColumnaEstadoProps,
   ColumnaImagenProps,
   TablaEstructuraColumnaProps,
   TablaTipoColumna,
} from "./tabla.table";

export interface ColumnasUsuario {
   id: number;
   index: number;
   fecha_registro: string;
   privilegio_id: number;
   privilegio_nombre?: string;
   usuario_nombre: string;
   usuario_apellido: string;
   correo: string;
   foto: ColumnaImagenProps;
   usuario: string;
   estado: ColumnaEstadoProps;
}

export const arrayEstructuraColumnasUsuario: TablaEstructuraColumnaProps[] = [
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
      field: "privilegio_nombre",
      header: "Privilegio",
      style: { width: "5%" },
   },
   {
      type: TablaTipoColumna.TEXT,
      field: "usuario_nombre",
      header: "Nombre",
      style: { width: "10%" },
   },
   {
      type: TablaTipoColumna.TEXT,
      field: "usuario_apellido",
      header: "Apellido",
      style: { width: "10%" },
   },
   {
      type: TablaTipoColumna.TEXT,
      field: "correo",
      header: "Correo",
      style: { width: "5%" },
   },
   {
      type: TablaTipoColumna.IMAGE,
      field: "foto",
      header: "Foto",
      style: { width: "4%" },
   },
   {
      type: TablaTipoColumna.TEXT,
      field: "usuario",
      header: "Usuario",
      style: { width: "5%" },
   },
   {
      type: TablaTipoColumna.STATUS,
      field: "estado",
      header: "Estado",
      style: { width: "4%" },
   },
];

export const arrayColumnasFiltroUsuario: string[] = [
   "fecha_registro",
   "privilegio_nombre",
   "usuario_nombre",
   "usuario_apellido",
   "correo",
   "usuario",
   "estado.estado",
];
