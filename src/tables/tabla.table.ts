import { CSSProperties } from "styled-components";

export enum TablaTipoColumna {
   TEXT = "text",
   STATUS = "status",
   IMAGE = "image",
   DATE = "date",
   MONEY = "money",
   NUMBER = "number",
}
export interface TablaEstructuraColumnaProps {
   type: TablaTipoColumna;
   field: string;
   header: string;
   style: CSSProperties;
}

export interface ColumnaImagenProps {
   img: string;
   alt: string;
}

export interface ColumnaEstadoProps {
   valor: boolean;
   estado: string;
}
