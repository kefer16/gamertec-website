import { useContext, useEffect, useState } from "react";
import {
   fechaActualISO,
   fechaVisualizarCalendario,
} from "../../../utils/funciones.utils";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import { MarcaResponse } from "../../../responses/marca.response";
import { MarcaEntity } from "../../../entities/marca.entities";
import { MarcaService } from "../../../services/marca.service";
import {
   ComboboxProps,
   arrayEstadoCombobox,
} from "../../../interfaces/combobox.interface";

interface Props {
   nombreFormulario: string;
   abrir: boolean;
   esEdicion: boolean;
   itemSeleccionado: MarcaResponse;
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
   const [activo, setActivo] = useState<ComboboxProps>({
      code: "0",
      name: "Inactivo",
   });
   const [arrayEstado] = useState<ComboboxProps[]>(arrayEstadoCombobox);
   const [fkCategoria, setFkCategoria] = useState<ComboboxProps>(
      {} as ComboboxProps
   );

   useEffect(() => {
      setMarcaId(itemSeleccionado.marca_id);
      setNombre(itemSeleccionado.nombre);
      setFecha_registro(
         fechaVisualizarCalendario(itemSeleccionado.fecha_registro)
      );
      setFkCategoria(
         arrayCategorias.find(
            (categoria: ComboboxProps) =>
               categoria.code === String(itemSeleccionado.fk_categoria)
         ) ?? ({} as ComboboxProps)
      );
      setActivo(
         itemSeleccionado.activo
            ? { code: "1", name: "Activo" }
            : { code: "0", name: "Inactivo" }
      );
   }, [itemSeleccionado, arrayCategorias]);

   const funcionGuardar = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data: MarcaEntity = new MarcaEntity(
         marcaId,
         nombre,
         activo.code === "1",
         parseInt(fkCategoria.code),
         fechaActualISO()
      );
      const srvMarca = new MarcaService();
      if (esEdicion) {
         await srvMarca
            .actualizar(marcaId, data)
            .then(() => {
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
         await srvMarca
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
            header={`${esEdicion ? "Editar" : "Registrar"} ${nombreFormulario}`}
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
                        value={fkCategoria}
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
                        type="text"
                        name="nombre"
                        style={{ width: "100%" }}
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
