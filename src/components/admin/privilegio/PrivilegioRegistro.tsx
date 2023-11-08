import { useContext, useEffect, useState } from "react";

import { fechaActualISO } from "../../../utils/funciones.utils";
import { PrivilegioService } from "../../../entities/privilegio.entities";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DropdownProps, estadoCategoria } from "../categoria/CategoriaRegistro";
import { GamertecSesionContext } from "../../sesion/Sesion.component";

interface Props {
   nombreFormulario: string;
   abrir: boolean;
   esEdicion: boolean;
   itemSeleccionado: PrivilegioService;
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
   const [activo, setActivo] = useState("");
   const [fechaRegistro, setFechaRegistro] = useState<string | Date | Date[]>(
      new Date()
   );
   const [abreviatura, setAbreviatura] = useState("");
   const [arrayEstado] = useState<DropdownProps[]>(estadoCategoria);

   useEffect(() => {
      setPrivilegioId(itemSeleccionado.privilegio_id);
      setTipo(itemSeleccionado.tipo);
      setActivo(itemSeleccionado.activo ? "1" : "0");
      setAbreviatura(itemSeleccionado.abreviatura);
      setFechaRegistro(itemSeleccionado.fecha_registro);
   }, [itemSeleccionado]);

   const funcionEnviarCategoria = async (
      event: React.FormEvent<HTMLFormElement>
   ) => {
      event.preventDefault();

      const data: PrivilegioService = new PrivilegioService(
         privilegioId,
         tipo,
         activo === "1",
         abreviatura,
         fechaActualISO()
      );

      if (esEdicion) {
         await PrivilegioService.Actualizar(privilegioId, data)
            .then((response) => {
               mostrarNotificacion({
                  tipo: "success",
                  titulo: "Exito",
                  detalle: `${nombreFormulario} se actualizó correctamente`,
                  pegado: false,
               });

               funcionActualizarTabla();
               funcionCerrarModal();
            })
            .catch((error: Error) => {
               mostrarNotificacion({
                  tipo: "error",
                  titulo: "Error",
                  detalle: error.message,
                  pegado: true,
               });
            });
      } else {
         await PrivilegioService.Registrar(data)
            .then((response) => {
               if (response.data.code === 200) {
                  mostrarNotificacion({
                     tipo: "success",
                     titulo: "Exito",
                     detalle: `${nombreFormulario} se registró correctamente`,
                     pegado: false,
                  });

                  funcionActualizarTabla();
                  funcionCerrarModal();
                  return;
               }
            })
            .catch((error: Error) => {
               mostrarNotificacion({
                  tipo: "error",
                  titulo: "Error",
                  detalle: error.message,
                  pegado: true,
               });
               return;
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
