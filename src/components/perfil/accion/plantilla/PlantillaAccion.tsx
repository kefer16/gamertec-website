import { useEffect, useContext, useState } from "react";
import { GamertecSesionContext } from "../../../sesion/Sesion.component";
import { Button } from "primereact/button";
import { UsuarioService } from "../../../../services/usuario.service";
import {
   ActualizaApellidoUsuario,
   ActualizaCorreoUsuario,
   ActualizaDireccionUsuario,
   ActualizaNombreUsuario,
} from "../../../../interfaces/usuario.interface";
import { InputText } from "primereact/inputtext";
interface Props {
   titulo: string;
   dato:
      | "usuario"
      | "correo"
      | "nombre"
      | "apellido"
      | "foto"
      | "direccion"
      | "telefono";
}

export const PlantillaAccion = ({ titulo, dato }: Props) => {
   const { obtenerSesion, sesionGamertec, mostrarNotificacion } = useContext(
      GamertecSesionContext
   );
   const [datoAnterior, setDatoAnterior] = useState<string>("");

   const [datoACambiar, setDatoACambiar] = useState<string>("");

   const actualizarDato = async (
      e: React.FormEvent<HTMLFormElement>,
      dato: string,
      usuario_id: number,
      dato_cambio: string
   ) => {
      e.preventDefault();
      const srvUsuario = new UsuarioService();
      if (dato === "nombre") {
         const data: ActualizaNombreUsuario = {
            nombre: dato_cambio,
         };
         await srvUsuario
            .actualizarNombre(usuario_id, data)
            .then((resp: ActualizaNombreUsuario) => {
               mostrarNotificacion({
                  tipo: "success",
                  detalle: `Se cambio el ${dato} correctamente`,
               });

               setDatoAnterior(resp.nombre);
            })
            .catch((error: Error) => {
               mostrarNotificacion({
                  tipo: "error",
                  detalle: `surgio un error: ${error.message}`,
               });
            });
      }

      if (dato === "apellido") {
         const data: ActualizaApellidoUsuario = {
            apellido: dato_cambio,
         };
         await srvUsuario
            .actualizarApellido(usuario_id, data)
            .then((resp: ActualizaApellidoUsuario) => {
               mostrarNotificacion({
                  tipo: "success",
                  detalle: `Se cambio el ${dato} correctamente`,
               });

               setDatoAnterior(resp.apellido);
            })
            .catch((error: Error) => {
               mostrarNotificacion({
                  tipo: "error",
                  detalle: `surgio un error: ${error.message}`,
               });
            });
      }

      if (dato === "correo") {
         const data: ActualizaCorreoUsuario = {
            correo: dato_cambio,
         };
         await srvUsuario
            .actualizarCorreo(usuario_id, data)
            .then((resp: ActualizaCorreoUsuario) => {
               mostrarNotificacion({
                  tipo: "success",
                  detalle: `Se cambio el ${dato} correctamente`,
               });

               setDatoAnterior(resp.correo);
            })
            .catch((error: Error) => {
               mostrarNotificacion({
                  tipo: "error",
                  detalle: `surgio un error: ${error.message}`,
               });
            });
      }

      if (dato === "direccion") {
         const data: ActualizaDireccionUsuario = {
            direccion: dato_cambio,
         };
         await srvUsuario
            .actualizarDireccion(usuario_id, data)
            .then((resp: ActualizaDireccionUsuario) => {
               mostrarNotificacion({
                  tipo: "success",
                  detalle: `Se cambio el ${dato} correctamente`,
               });

               setDatoAnterior(resp.direccion);
            })
            .catch((error: Error) => {
               mostrarNotificacion({
                  tipo: "error",
                  detalle: `surgio un error: ${error.message}`,
               });
            });
      }
   };

   useEffect(() => {
      obtenerSesion();

      setDatoAnterior(sesionGamertec.usuario[dato]);
   }, [dato, obtenerSesion, titulo, sesionGamertec]);

   return (
      <form
         className="form__accion"
         method="POST"
         onSubmit={(e) =>
            actualizarDato(
               e,
               dato,
               sesionGamertec.usuario.usuario_id,
               datoACambiar
            )
         }
      >
         <div className="form__accion__cambio">
            <label className="form__accion__cambio-definicion">{`${titulo} actual: `}</label>
            <p className="form__accion__cambio-valor">{datoAnterior}</p>
         </div>
         <div className="form__accion__cambio">
            <label
               className="form__accion__cambio-definicion"
               htmlFor="input-label"
            >{`Ingrese Nuevo ${titulo}:`}</label>

            <InputText
               className="form__accion__cambio-valor"
               id="input-label"
               type="text"
               placeholder={`Ingrese ${dato}`}
               value={datoACambiar}
               onChange={(e) => setDatoACambiar(e.target.value)}
            />
         </div>

         <div className="boton">
            <Button label="Actualizar" type="submit" />
         </div>
      </form>
   );
};
