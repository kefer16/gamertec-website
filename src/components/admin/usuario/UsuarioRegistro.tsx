import { useContext, useEffect, useState } from "react";
import {
   fechaActualISO,
   fechaVisualizarCalendario,
} from "../../../utils/funciones.utils";

import { UsuarioService } from "../../../services/usuario.service";
import { UsuarioEntity } from "../../../entities/usuario.entities";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { DropdownProps, estadoCategoria } from "../categoria/CategoriaRegistro";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";

interface Props {
   nombreFormulario: string;
   abrir: boolean;
   esEdicion: boolean;
   itemSeleccionado: UsuarioEntity;
   funcionCerrarModal: () => void;
   funcionActualizarTabla: () => void;
   arrayPrivilegios: DropdownProps[];
}

export const UsuarioRegistro = ({
   nombreFormulario,
   abrir,
   esEdicion,
   itemSeleccionado,
   funcionCerrarModal,
   funcionActualizarTabla,
   arrayPrivilegios,
}: Props) => {
   const { mostrarNotificacion } = useContext(GamertecSesionContext);
   const [usuarioId, setUsuarioId] = useState(0);
   const [nombre, setNombre] = useState("");
   const [apellido, setApellido] = useState("");
   const [correo, setCorreo] = useState("");
   const [usuario, setUsuario] = useState("");
   const [contrasenia, setContrasenia] = useState("");
   const [foto, setFoto] = useState("");
   const [fechaRegistro, setFechaRegistro] = useState<string | Date | Date[]>(
      new Date()
   );
   const [activo, setActivo] = useState<DropdownProps>({
      code: "0",
      name: "Inactivo",
   });
   const [fk_privilegio, setFk_privilegio] = useState<DropdownProps>(
      {} as DropdownProps
   );
   const [arrayEstado] = useState<DropdownProps[]>(estadoCategoria);

   useEffect(() => {
      setUsuarioId(itemSeleccionado.usuario_id);
      setNombre(itemSeleccionado.nombre);
      setApellido(itemSeleccionado.apellido);
      setCorreo(itemSeleccionado.correo);
      setUsuario(itemSeleccionado.usuario);
      setContrasenia(itemSeleccionado.contrasenia);
      setFoto(itemSeleccionado.foto);
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
      setFk_privilegio(
         arrayPrivilegios.find(
            (privilegio: DropdownProps) =>
               privilegio.code === String(itemSeleccionado.fk_privilegio)
         ) ?? ({} as DropdownProps)
      );
   }, [itemSeleccionado, arrayPrivilegios]);

   const funFormularioUsuarioEnviar = async (
      event: React.FormEvent<HTMLFormElement>
   ) => {
      event.preventDefault();

      const data: UsuarioEntity = new UsuarioEntity(
         usuarioId,
         nombre,
         apellido,
         correo,
         usuario,
         contrasenia,
         foto,
         fechaActualISO(),
         "",
         "",
         activo.code === "1",
         parseInt(fk_privilegio.code)
      );

      if (esEdicion) {
         const usuServ = new UsuarioService();

         await usuServ
            .actualizar(usuarioId, data)
            .then(() => {
               mostrarNotificacion({
                  tipo: "success",
                  detalle: "Usuario se actualizó correctamente",
               });
               funcionActualizarTabla();
               funcionCerrarModal();
               return;
            })
            .catch((error: Error) => {
               mostrarNotificacion({
                  tipo: "error",
                  detalle: `surgio un error: ${error.message}`,
               });
            });
      } else {
         const usuServ = new UsuarioService();

         await usuServ
            .registrar(data)
            .then(() => {
               mostrarNotificacion({
                  tipo: "success",
                  detalle: "Usuario se actualizó correctamente",
               });
               funcionActualizarTabla();
               funcionCerrarModal();
            })
            .catch((error: Error) => {
               console.log("Erro", error);

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
               onSubmit={(e) => funFormularioUsuarioEnviar(e)}
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
                     <label htmlFor="select-privilegio">Privilegio</label>
                     <Dropdown
                        id="select-privilegio"
                        style={{ width: "100%" }}
                        value={fk_privilegio}
                        onChange={(e: DropdownChangeEvent) =>
                           setFk_privilegio(e.value)
                        }
                        options={arrayPrivilegios}
                        optionLabel="name"
                        placeholder="Selec. Privilegio"
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
                     <label htmlFor="input-apellido">Apellido</label>
                     <InputText
                        id="input-apellido"
                        type="text"
                        name="apellido"
                        style={{ width: "100%" }}
                        value={apellido}
                        onChange={(event) => setApellido(event.target.value)}
                     />
                  </div>

                  <div>
                     <label htmlFor="input-nombre">Correo</label>
                     <InputText
                        id="input-nombre"
                        type="email"
                        name="correo"
                        style={{ width: "100%" }}
                        value={correo}
                        onChange={(event) => setCorreo(event.target.value)}
                     />
                  </div>

                  <div>
                     <label htmlFor="input-usuario">Usuario</label>
                     <InputText
                        id="input-usuario"
                        type="text"
                        name="usuario"
                        style={{ width: "100%" }}
                        value={usuario}
                        onChange={(event) => setUsuario(event.target.value)}
                     />
                  </div>

                  <div>
                     <label htmlFor="input-contrasenia">Contraseña</label>
                     <InputText
                        id="input-contrasenia"
                        type="password"
                        name="contrasenia"
                        style={{ width: "100%" }}
                        value={contrasenia}
                        onChange={(event) => setContrasenia(event.target.value)}
                     />
                  </div>

                  <div>
                     <label htmlFor="input-confirmacion">Confirmación</label>
                     <InputText
                        id="input-confirmacion"
                        type="password"
                        name="confirmacion"
                        style={{ width: "100%" }}
                        value={contrasenia}
                        onChange={(event) => setContrasenia(event.target.value)}
                     />
                  </div>
                  <div>
                     <label htmlFor="input-foto">Foto</label>
                     <InputText
                        id="input-foto"
                        type="text"
                        name="foto"
                        style={{ width: "100%" }}
                        value={foto}
                        onChange={(event) => setFoto(event.target.value)}
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
