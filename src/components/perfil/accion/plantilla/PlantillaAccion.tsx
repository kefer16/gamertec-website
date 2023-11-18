import { useEffect, useContext, useState } from "react";
import { GamertecSesionContext } from "../../../sesion/Sesion.component";
import { Button } from "primereact/button";
import { UsuarioService } from "../../../../services/usuario.service";
import { RespuestaEntity } from "../../../../entities/respuesta.entity";
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
      const usuServ = new UsuarioService();
      if (dato === "nombre") {
         const data: ActualizaNombreUsuario = {
            nombre: dato_cambio,
         };
         await usuServ
            .actualizarNombre(usuario_id, data)
            .then((resp: RespuestaEntity<ActualizaNombreUsuario>) => {
               if (resp.data) {
                  mostrarNotificacion({
                     tipo: "success",
                     detalle: `Se cambio el ${dato} correctamente`,
                  });

                  setDatoAnterior(resp.data.nombre);
               }
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
         await usuServ
            .actualizarApellido(usuario_id, data)
            .then((resp: RespuestaEntity<ActualizaApellidoUsuario>) => {
               if (resp.data) {
                  mostrarNotificacion({
                     tipo: "success",
                     detalle: `Se cambio el ${dato} correctamente`,
                  });

                  setDatoAnterior(resp.data.apellido);
               }
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
         await usuServ
            .actualizarCorreo(usuario_id, data)
            .then((resp: RespuestaEntity<ActualizaCorreoUsuario>) => {
               if (resp.data) {
                  mostrarNotificacion({
                     tipo: "success",
                     detalle: `Se cambio el ${dato} correctamente`,
                  });

                  setDatoAnterior(resp.data.correo);
               }
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
         await usuServ
            .actualizarDireccion(usuario_id, data)
            .then((resp: RespuestaEntity<ActualizaDireccionUsuario>) => {
               if (resp.data) {
                  mostrarNotificacion({
                     tipo: "success",
                     detalle: `Se cambio el ${dato} correctamente`,
                  });

                  setDatoAnterior(resp.data.direccion);
               }
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
