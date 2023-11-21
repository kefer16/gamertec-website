import { useEffect, useState } from "react";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { CSSProperties } from "styled-components";
import { Tag } from "primereact/tag";
import {
   fechaVisualDateToString,
   formatoMonedaPerunana,
} from "../../utils/funciones.utils";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { IconFilterOff, IconSearch } from "@tabler/icons-react";
import { ToolbarControl } from "./ToobarControl";
import {
   ColumnaEstadoProps,
   ColumnaImagenProps,
   TablaEstructuraColumnaProps,
   TablaTipoColumna,
} from "../../tables/tabla.table";

interface Props<T> {
   ancho: CSSProperties;
   columnas: TablaEstructuraColumnaProps[];
   filas: T[];
   filaSeleccionada: T;
   arrayFiltroGlobal: string[];
   funcionFilaSeleccionada: (param: T) => void;
   funcionCrear?: () => void;
   funcionActualizar?: () => void;
   funcionEliminar?: () => void;
   funcionHistoria?: () => void;
}

const defaultFilters: DataTableFilterMeta = {
   global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

export const TableControl = <T extends object>({
   ancho,
   columnas,
   filas,
   filaSeleccionada,
   arrayFiltroGlobal,
   funcionFilaSeleccionada,
   funcionCrear,
   funcionActualizar,
   funcionEliminar,
   funcionHistoria,
}: Props<T>) => {
   const [isLoading, setIsLoading] = useState(true);
   const [filtros, setFiltros] = useState<DataTableFilterMeta>(defaultFilters);
   const [valorFiltroGlobal, setValorFiltroGlobal] = useState<string>("");

   useEffect(() => {
      setIsLoading(true);

      initFilters();

      setTimeout(() => {
         setIsLoading(false);
      }, 2000);
   }, []);

   const limpiarFiltro = () => {
      const value = "";
      let _filters = { ...filtros };

      // @ts-ignore
      _filters["global"].value = value;

      setFiltros(_filters);
      setValorFiltroGlobal(value);
   };

   const activarFiltroGlobal = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      let _filters = { ...filtros };

      // @ts-ignore
      _filters["global"].value = value;

      setFiltros(_filters);
      setValorFiltroGlobal(value);
   };

   const initFilters = () => {
      setFiltros(defaultFilters);
      setValorFiltroGlobal("");
   };

   const header = () => {
      return (
         <div className="flex justify-content-between">
            <div>
               <ToolbarControl
                  functionCrear={funcionCrear}
                  functionActualizar={funcionActualizar}
                  functionEliminar={funcionEliminar}
                  functionHistoria={funcionHistoria}
               />
            </div>
            <div style={{ display: "flex" }}>
               <Button
                  style={{ marginRight: "5px" }}
                  type="button"
                  icon={
                     <IconFilterOff style={{ marginRight: "5px" }} size={24} />
                  }
                  outlined
                  onClick={limpiarFiltro}
               />
               <span className="p-input-icon-left flex align-items">
                  <IconSearch style={{ top: "47%" }} size={20} />
                  <InputText
                     value={valorFiltroGlobal}
                     onChange={activarFiltroGlobal}
                     placeholder="Ingrese valor a buscar"
                  />
               </span>
            </div>
         </div>
      );
   };

   return (
      <>
         <div className="card">
            <DataTable
               value={filas}
               paginator
               rows={10}
               rowsPerPageOptions={[10, 20, 30]}
               tableStyle={ancho}
               selection={filaSeleccionada}
               onSelectionChange={(e) => {
                  if (e.value !== null) {
                     funcionFilaSeleccionada(e.value);
                  }
               }}
               dataKey="id"
               loading={isLoading}
               showGridlines
               filters={filtros}
               globalFilterFields={arrayFiltroGlobal}
               header={header}
               emptyMessage="Ningun Resultado Encontrado"
            >
               <Column
                  selectionMode="single"
                  headerStyle={{ width: "1%" }}
               ></Column>
               {!columnas ? (
                  <></>
               ) : (
                  columnas.map((item: TablaEstructuraColumnaProps) => {
                     switch (item.type) {
                        case TablaTipoColumna.TEXT: {
                           return (
                              <Column
                                 key={item.field}
                                 field={item.field}
                                 header={item.header}
                                 style={item.style}
                                 sortable
                              />
                           );
                        }
                        case TablaTipoColumna.STATUS: {
                           const body = (fila: any) => {
                              const estado: ColumnaEstadoProps =
                                 fila[`${item.field}`];
                              return (
                                 <Tag
                                    value={estado.estado}
                                    severity={
                                       estado.valor ? "success" : "danger"
                                    }
                                 />
                              );
                           };
                           return (
                              <Column
                                 key={item.field}
                                 field={item.field}
                                 header={item.header}
                                 style={item.style}
                                 body={body}
                              />
                           );
                        }
                        case TablaTipoColumna.IMAGE: {
                           const body = (fila: any) => {
                              const imagen: ColumnaImagenProps =
                                 fila[`${item.field}`];

                              return (
                                 <img
                                    src={imagen.img}
                                    alt={imagen.alt}
                                    className="w-4rem shadow-2 border-round"
                                 />
                              );
                           };

                           return (
                              <Column
                                 key={item.field}
                                 field={item.field}
                                 header={item.header}
                                 style={item.style}
                                 body={body}
                              />
                           );
                        }
                        case TablaTipoColumna.DATE: {
                           const body = (fila: any) => {
                              const fecha: Date = fila[`${item.field}`];
                              return fechaVisualDateToString(fecha);
                           };

                           return (
                              <Column
                                 key={item.field}
                                 field={item.field}
                                 header={item.header}
                                 style={item.style}
                                 dataType="date"
                                 body={body}
                                 sortable
                              />
                           );
                        }
                        case TablaTipoColumna.MONEY: {
                           const body = (fila: any) => {
                              const money: number = fila[`${item.field}`];
                              return formatoMonedaPerunana(money);
                           };

                           return (
                              <Column
                                 key={item.field}
                                 field={item.field}
                                 header={item.header}
                                 style={item.style}
                                 dataType="number"
                                 className="text-right"
                                 body={body}
                                 sortable
                              />
                           );
                        }
                        case TablaTipoColumna.NUMBER: {
                           return (
                              <Column
                                 key={item.field}
                                 dataType="number"
                                 field={item.field}
                                 header={item.header}
                                 style={item.style}
                                 className="text-right"
                                 sortable
                              />
                           );
                        }
                        default: {
                           return <></>;
                        }
                     }
                  })
               )}
            </DataTable>
         </div>
      </>
   );
};
