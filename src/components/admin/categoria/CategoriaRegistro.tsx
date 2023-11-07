import { useEffect, useState } from "react";
import { CategoryService } from "../../../entities/categoria.entities";
import { fechaActualISO } from "../../../utils/funciones.utils";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
// import { ScrollPanel } from "primereact/scrollpanel";

export interface DropdownProps {
   name: string;
   code: string;
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
   const [categoriaId, setCategoriaId] = useState(0);
   const [nombre, setNombre] = useState("");
   const [activo, setActivo] = useState("");
   const [fecha_registro, setFecha_registro] = useState<string | Date | Date[]>(
      ""
   );
   const [arrayEstado] = useState<DropdownProps[]>(estadoCategoria);
   const [estado, setEstado] = useState<DropdownProps>({
      code: "0",
      name: "Todas las Categorias",
   });

   useEffect(() => {
      setCategoriaId(itemSeleccionado.categoria_id);
      setNombre(itemSeleccionado.nombre);
      setActivo(itemSeleccionado.activo ? "1" : "0");
      setFecha_registro(itemSeleccionado.fecha_registro);
   }, [itemSeleccionado]);

   const funcionEnviarCategoria = async (
      event: React.FormEvent<HTMLFormElement>
   ) => {
      event.preventDefault();

      const dataCategoria: CategoryService = new CategoryService(
         categoriaId,
         nombre,
         activo === "1",
         fechaActualISO(),
         fechaActualISO()
      );

      if (esEdicion) {
         await CategoryService.Actualizar(categoriaId, dataCategoria)
            .then((response) => {
               if (response.data.code === 200) {
                  // funcionAsignarAlerta(
                  //    "success",
                  //    `${nombreFormulario} se actualizó correctamente`
                  // );

                  funcionActualizarTabla();
                  funcionCerrarModal();
                  return;
               }
            })
            .catch(() => {
               // funcionAsignarAlerta("error", "Hubo un error");
               return;
            });
      } else {
         await CategoryService.Registrar(dataCategoria)
            .then((response) => {
               if (response.data.code === 200) {
                  // funcionAsignarAlerta(
                  //    "success",
                  //    `${nombreFormulario} se registró correctamente`
                  // );
                  funcionActualizarTabla();
                  funcionCerrarModal();
                  return;
               }
            })
            .catch(() => {
               // funcionAsignarAlerta("error", "Hubo un error");
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
                     height: "200px",
                     // borderRadius: "10px",
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
                        value={fecha_registro}
                        onChange={(e) => setFecha_registro(e.value ?? "")}
                        showIcon
                        disabled
                     />
                  </div>
                  <div>
                     <label htmlFor="input-nombre">Nombre Categoria</label>
                     <InputText
                        id="input-nombre"
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
                        value={estado}
                        onChange={(e: DropdownChangeEvent) =>
                           setEstado(e.value)
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
