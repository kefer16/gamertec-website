import { useContext, useEffect, useState } from "react";
import { fechaActualISO } from "../../../utils/funciones.utils";
import { MarcaService } from "../../../entities/marca.entities";
import { ComboboxProps } from "../../../interfaces/combobox.interface";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DropdownProps, estadoCategoria } from "../categoria/CategoriaRegistro";
import { GamertecSesionContext } from "../../sesion/Sesion.component";

interface Props {
   nombreFormulario: string;
   abrir: boolean;
   esEdicion: boolean;
   itemSeleccionado: MarcaService;
   funcionCerrarModal: () => void;
   funcionActualizarTabla: () => void;
   arrayCategorias: ComboboxProps[];
}

export const MarcaRegistro = ({
   nombreFormulario,
   abrir,
   esEdicion,
   itemSeleccionado,
   funcionCerrarModal,
   funcionActualizarTabla,
   arrayCategorias,
}: Props) => {
   const { mostrarNotificacion } = useContext(GamertecSesionContext);
   const [marcaId, setMarcaId] = useState(0);
   const [nombre, setNombre] = useState("");
   const [fecha_registro, setFecha_registro] = useState<string | Date | Date[]>(
      new Date()
   );
   const [activo, setActivo] = useState("");
   const [arrayEstado] = useState<DropdownProps[]>(estadoCategoria);
   const [estado, setEstado] = useState<DropdownProps>({
      code: "0",
      name: "Todas las Categorias",
   });
   const [fkCategoria, setFkCategoria] = useState("0");

   useEffect(() => {
      setMarcaId(itemSeleccionado.marca_id);
      setNombre(itemSeleccionado.nombre);
      setFecha_registro(itemSeleccionado.fecha_registro);
      setFkCategoria(String(itemSeleccionado.fk_categoria));
      setActivo(itemSeleccionado.activo ? "1" : "0");
   }, [itemSeleccionado]);

   const funcionGuardar = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data: MarcaService = new MarcaService(
         marcaId,
         nombre,
         activo === "1",
         parseInt(fkCategoria),
         fechaActualISO()
      );
      if (esEdicion) {
         await MarcaService.Actualizar(marcaId, data)
            .then((response) => {
               if (response.data.code === 200) {
                  mostrarNotificacion({
                     tipo: "success",
                     titulo: "Exito",
                     detalle: `${nombreFormulario} se actualizó correctamente`,
                     pegado: false,
                  });
                  funcionActualizarTabla();
                  funcionCerrarModal();
               }
            })
            .catch((error: Error) => {
               mostrarNotificacion({
                  tipo: "error",
                  titulo: "Error",
                  detalle: error.message,
                  pegado: false,
               });
            });
      } else {
         await MarcaService.Registrar(data)
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
               }
            })
            .catch((error: Error) => {
               mostrarNotificacion({
                  tipo: "error",
                  titulo: "Error",
                  detalle: error.message,
                  pegado: false,
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
               onSubmit={(e) => funcionGuardar(e)}
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
                        value={fecha_registro}
                        onChange={(e) => setFecha_registro(e.value ?? "")}
                        showIcon
                        disabled
                     />
                  </div>

                  <div>
                     <label htmlFor="select-categoria">Categoria</label>
                     <Dropdown
                        id="select-categoria"
                        style={{ width: "100%" }}
                        value={estado}
                        onChange={(e: DropdownChangeEvent) =>
                           setFkCategoria(e.value)
                        }
                        options={arrayCategorias}
                        optionLabel="name"
                        placeholder="Todas las Categorias"
                     />
                  </div>

                  <div>
                     <label htmlFor="input-nombre">Nombre</label>
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
