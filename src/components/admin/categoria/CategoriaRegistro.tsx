import { useContext, useEffect, useState } from "react";
import { CategoryService } from "../../../entities/categoria.entities";
import {
   fechaActualISO,
   fechaVisualizarCalendario,
} from "../../../utils/funciones.utils";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { GamertecSesionContext } from "../../sesion/Sesion.component";

export interface DropdownProps {
   name: string;
   code: string;
}
export interface DropdownPropsAnidado {
   name: string;
   code: string;
   codeAnidado: string;
}
interface Props {
   nombreFormulario: string;
   abrir: boolean;
   esEdicion: boolean;
   itemSeleccionado: CategoryService;
   funcionCerrarModal: () => void;
   funcionActualizarTabla: () => void;
}

export const estadoCategoria: DropdownProps[] = [
   {
      code: "1",
      name: "Activo",
   },
   {
      code: "0",
      name: "Inactivo",
   },
];
export const CategoryRegister = ({
   nombreFormulario,
   abrir,
   esEdicion,
   itemSeleccionado,
   funcionCerrarModal,
   funcionActualizarTabla,
}: Props) => {
   const { mostrarNotificacion } = useContext(GamertecSesionContext);
   const [categoriaId, setCategoriaId] = useState(0);
   const [nombre, setNombre] = useState("");
   const [activo, setActivo] = useState<DropdownProps>({
      code: "0",
      name: "Inactivo",
   });
   const [fechaRegistro, setFechaRegistro] = useState<string | Date | Date[]>(
      new Date()
   );
   const [arrayEstado] = useState<DropdownProps[]>(estadoCategoria);

   useEffect(() => {
      setCategoriaId(itemSeleccionado.categoria_id);
      setNombre(itemSeleccionado.nombre);
      setFechaRegistro(
         fechaVisualizarCalendario(itemSeleccionado.fecha_registro)
      );
      setActivo(
         itemSeleccionado.activo
            ? {
                 code: "1",
                 name: "Activo",
              }
            : {
                 code: "0",
                 name: "Inactivo",
              }
      );
   }, [itemSeleccionado]);

   const funcionEnviarCategoria = async (
      event: React.FormEvent<HTMLFormElement>
   ) => {
      event.preventDefault();

      const dataCategoria: CategoryService = new CategoryService(
         categoriaId,
         nombre,
         activo.code === "1",
         fechaActualISO(),
         fechaActualISO()
      );

      if (esEdicion) {
         await CategoryService.Actualizar(categoriaId, dataCategoria)
            .then((response) => {
               mostrarNotificacion({
                  tipo: "success",
                  detalle: `${nombreFormulario} se actualizó correctamente`,
               });
               funcionActualizarTabla();
               funcionCerrarModal();
            })
            .catch((error: Error) => {
               mostrarNotificacion({
                  tipo: "error",
                  detalle: error.message,
               });
            });
      } else {
         await CategoryService.Registrar(dataCategoria)
            .then((response) => {
               mostrarNotificacion({
                  tipo: "success",
                  detalle: `${nombreFormulario} se registró correctamente`,
               });

               funcionActualizarTabla();
               funcionCerrarModal();
            })
            .catch((error: Error) => {
               mostrarNotificacion({
                  tipo: "error",
                  detalle: error.message,
               });
            });
      }
   };
   return (
      <>
         <Dialog
            header={`${esEdicion ? "Editar" : "Registrar"} ${nombreFormulario}`}
            visible={abrir}
            onHide={funcionCerrarModal}
            headerStyle={{ background: "#f8f9fa" }}
            contentStyle={{ padding: "0px" }}
         >
            <form
               onSubmit={(e) => funcionEnviarCategoria(e)}
               style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0 24px 24px 24px",
                  background: "#f8f9fa",
               }}
            >
               <div
                  style={{
                     width: "100%",
                     padding: "24px",
                     height: "200px",
                     overflowY: "auto",
                     background: "#fff",
                     border: "1px solid #cccccc75",
                  }}
               >
                  <div>
                     <label htmlFor="calendar">Fecha Registro</label>
                     <Calendar
                        id="calendar"
                        dateFormat="dd/mm/yy"
                        showTime
                        hourFormat="24"
                        style={{ width: "100%" }}
                        value={fechaRegistro}
                        showIcon
                        disabled
                     />
                  </div>
                  <div>
                     <label htmlFor="input-nombre">Nombre Categoría</label>
                     <InputText
                        id="input-nombre"
                        type="text"
                        style={{ width: "100%" }}
                        name="name"
                        value={nombre}
                        onChange={(event) => setNombre(event.target.value)}
                     />
                  </div>
                  <div>
                     <label htmlFor="select-estado">Estado</label>
                     <Dropdown
                        id="select-estado"
                        style={{ width: "100%" }}
                        value={activo}
                        onChange={(e: DropdownChangeEvent) =>
                           setActivo(e.value)
                        }
                        options={arrayEstado}
                        optionLabel="name"
                        placeholder="Todas las Categorias"
                     />
                  </div>
               </div>
               <Button
                  style={{ marginTop: "24px" }}
                  severity={esEdicion ? "warning" : "success"}
                  type="submit"
                  label={esEdicion ? "Editar" : "Registrar"}
               />
            </form>
         </Dialog>
      </>
   );
};
