import { useContext, useEffect, useState } from "react";

import {
   fechaActualISO,
   fechaVisualizarCalendario,
} from "../../../utils/funciones.utils";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DropdownProps, estadoCategoria } from "../categoria/CategoriaRegistro";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import { PrivilegioService } from "../../../services/privilegio.service";
import { PrivilegioEntity } from "../../../entities/privilegio.entities";

interface Props {
   nombreFormulario: string;
   abrir: boolean;
   esEdicion: boolean;
   itemSeleccionado: PrivilegioEntity;
   funcionCerrarModal: () => void;
   funcionActualizarTabla: () => void;
}

export const PrivilegioRegistro = ({
   nombreFormulario,
   abrir,
   esEdicion,
   itemSeleccionado,
   funcionCerrarModal,
   funcionActualizarTabla,
}: Props) => {
   const { mostrarNotificacion } = useContext(GamertecSesionContext);
   const [privilegioId, setPrivilegioId] = useState(0);
   const [tipo, setTipo] = useState("");
   const [activo, setActivo] = useState<DropdownProps>({
      code: "0",
      name: "Inactivo",
   });
   const [fechaRegistro, setFechaRegistro] = useState<string | Date | Date[]>(
      new Date()
   );
   const [abreviatura, setAbreviatura] = useState("");
   const [arrayEstado] = useState<DropdownProps[]>(estadoCategoria);

   useEffect(() => {
      setPrivilegioId(itemSeleccionado.privilegio_id);
      setTipo(itemSeleccionado.tipo);
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
      setAbreviatura(itemSeleccionado.abreviatura);
      setFechaRegistro(
         fechaVisualizarCalendario(itemSeleccionado.fecha_registro)
      );
   }, [itemSeleccionado]);

   const funcionEnviarCategoria = async (
      event: React.FormEvent<HTMLFormElement>
   ) => {
      event.preventDefault();

      const data: PrivilegioEntity = {
         privilegio_id: privilegioId,
         tipo: tipo,
         activo: activo.code === "1",
         abreviatura: abreviatura,
         fecha_registro: fechaActualISO(),
      };
      const srvPrivilegio = new PrivilegioService();

      if (esEdicion) {
         await srvPrivilegio
            .actualizar(privilegioId, data)
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
         await srvPrivilegio
            .registrar(data)
            .then(() => {
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
            header={`Registrar ${nombreFormulario}`}
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
                     height: "300px",
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
                        onChange={(e) => setFechaRegistro(e.value ?? "")}
                        showIcon
                        disabled
                     />
                  </div>
                  <div>
                     <label htmlFor="input-nombre">Nombre</label>
                     <InputText
                        id="input-nombre"
                        style={{ width: "100%" }}
                        name="name"
                        value={tipo}
                        onChange={(event) => setTipo(event.target.value)}
                     />
                  </div>

                  <div>
                     <label htmlFor="input-nombre">Abreviatura</label>
                     <InputText
                        id="input-nombre"
                        style={{ width: "100%" }}
                        name="name"
                        value={abreviatura}
                        onChange={(event) => setAbreviatura(event.target.value)}
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
                  label={esEdicion ? "Editar" : "Registrarse"}
               />
            </form>
         </Dialog>
      </>
   );
};
